"use server";

import { print } from "graphql";
import { authFetchGraphql, fetchGraphql } from "../fetchGraphQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { Comment } from "../types/modelTypes";
import { CreateComentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/commentsFormSchema";

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

export const saveComment = async (
  state: CreateComentFormState,
  formData: FormData
): Promise<CreateComentFormState> => {
  const fData = Object.fromEntries(formData.entries());
  const validateFields = CommentFormSchema.safeParse(fData);

  if (!validateFields.success) {
    return {
      data: fData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const variables = {
    createCommentInput: {
      postId: +validateFields.data.postId,
      content: validateFields.data.content,
    },
  };

  const data = await authFetchGraphql(
    print(CREATE_COMMENT_MUTATION),
    variables
  );

  if (data.errors) {
    return {
      data: fData,
      message: data.errors[0].message,
      ok: false,
      open: true,
    };
  }

  if (data) {
    return {
      message: "Comment created successfully",
      ok: true,
      open: false,
    };
  }
};
