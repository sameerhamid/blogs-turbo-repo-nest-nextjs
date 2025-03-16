"use server";

import { print } from "graphql";
import { authFetchGraphql } from "../fetchGraphQL";
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  UNLIKE_POST_MUTATION,
} from "../gqlQueries";

export async function getPostLikesData(postId: number) {
  const data = await authFetchGraphql(print(POST_LIKES), { postId });

  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean,
  };
}

export async function likePost(postId: number) {
  const data = await authFetchGraphql(print(LIKE_POST_MUTATION), { postId });

  return data.likePost as boolean;
}

export async function unlikePost(postId: number) {
  const data = await authFetchGraphql(print(UNLIKE_POST_MUTATION), { postId });

  //   if (data.error) {
  //   }

  return data.unlikePost as boolean;
}
