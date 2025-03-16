"use server";

import { authFetchGraphql, fetchGraphql } from "../fetchGraphQL";
import { print } from "graphql";
import { GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS } from "../gqlQueries";
import { Post, PostWithLikeAndCommentCount } from "../types/modelTypes";
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

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphql(print(GET_POST_BY_ID), { id });
  return data.getPostById as Post;
};

export async function fethUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize: number;
}) {
  const { skip, take } = transforTakeSkip({ page, pageSize });

  const data = await authFetchGraphql(print(GET_USER_POSTS), {
    skip,
    take,
  });
  console.log("posts>>>", data);
  return {
    posts: data.getUserPosts as PostWithLikeAndCommentCount[],
    totalPost: data.userPostsCount as number,
  };
}
