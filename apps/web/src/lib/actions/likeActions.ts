"use server";

import { print } from "graphql";
import { authFetchGraphql, fetchGraphql } from "../fetchGraphQL";
import {
  LIKE_POST_MUTATION,
  POST_LIKES_COUNT,
  UNLIKE_POST_MUTATION,
  USER_LIKED_POST,
} from "../gqlQueries";

export async function getPostLikesData(postId: number) {
  const likesCount = await fetchGraphql(print(POST_LIKES_COUNT), { postId });
  const userLikedPost = await authFetchGraphql(print(USER_LIKED_POST), {
    postId,
  });

  if (userLikedPost.error) {
    return {
      likeCount: likesCount.postLikesCount as number,
      userLikedPost: false,
    };
  }

  return {
    likeCount: likesCount.postLikesCount as number,
    userLikedPost: userLikedPost.userLikedPost as boolean,
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
