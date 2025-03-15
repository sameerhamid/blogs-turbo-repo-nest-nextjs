"use server";

import { print } from "graphql";
import { fetchGraphql } from "../fetchGraphQL";
import { GET_POST_COMMENTS } from "../gqlQueries";
import { Comment } from "../types/modelTypes";

export const getPostComments = async ({
  postId,
  take,
  skip,
}: {
  postId: number;
  take: number;
  skip: number;
}) => {
  // add timer for loading

  const data = await fetchGraphql(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComments as Comment[],
    totalComments: data.postCommentCount as number,
  };
};
