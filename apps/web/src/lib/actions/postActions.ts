"use server";

import { fetchGraphql } from "../fetchGraphQL";
import { print } from "graphql";
import { GET_POSTS } from "../gqlQueries";
import { Post } from "../types/modelTypes";
import { transforTakeSkip } from "../helpers";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { take, skip } = transforTakeSkip({ page, pageSize });

  const data = await fetchGraphql(print(GET_POSTS), { skip, take });
  console.log("posts>>>", data);
  return { posts: data.posts as Post[], totalPost: data.postCount };
};
