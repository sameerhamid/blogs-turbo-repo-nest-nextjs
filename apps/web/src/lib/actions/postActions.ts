"use server";

import { authFetchGraphql, fetchGraphql } from "../fetchGraphQL";
import { print } from "graphql";
import { GET_POST_BY_ID, GET_POSTS, GET_USER_POSTS } from "../gqlQueries";
import { Post, PostWithLikeAndCommentCount } from "../types/modelTypes";
import { transforTakeSkip } from "../helpers";
import { PostFormState } from "../types/formState";
import { PostFormSchema } from "../zodSchemas/postFormSchema";

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

export async function saveNewPost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const fData = Object.fromEntries(formData.entries());
  const validateFields = PostFormSchema.safeParse(fData);
  if (!validateFields.success) {
    return {
      data: fData,
      errors: validateFields.error.flatten().fieldErrors,
      ok: false,
    };
  }
  // uplaod thumbnail to superbase

  const thumbnailUrl = "";

  return undefined;
}
