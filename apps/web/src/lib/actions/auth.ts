"use server";

import { error } from "console";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";
import { fetchGraphql } from "../fetchGraphQL";
import { print } from "graphql";
import { CREATE_USER_MUTATION } from "../gqlQueries";
import { redirect } from "next/navigation";

export async function signUp(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const fData = Object.fromEntries(formData.entries());
  const validateFields = SignUpFormSchema.safeParse(fData);

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  if (!validateFields.success)
    return {
      data: fData,
      errors: validateFields.error.flatten().fieldErrors,
    };

  const variables = {
    createUserInput: {
      name: validateFields.data.name,
      email: validateFields.data.email,
      password: validateFields.data.password,
    },
  };
  const data = await fetchGraphql(print(CREATE_USER_MUTATION), variables);

  if (data.error) {
    return {
      data: fData,
      message: "Something went wrong",
    };
  }
  redirect("/auth/signin");
}
