"use server";

import { fetchGraphql } from "../fetchGraphQL";
import { print } from "graphql";
import { GET_POSTS } from "../gqlQueries";
import { Post } from "../types/modelTypes";

export const fetchPosts = async () => {
  const data = await fetchGraphql(print(GET_POSTS));
  console.log("posts>>>", data);
  return data.posts as Post[];
};
