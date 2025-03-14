"use server";

import { error } from "console";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";
import { fetchGraphql } from "../fetchGraphQL";
import { print } from "graphql";
import { CREATE_USER_MUTATION, LOGIN_USER_MUTATION } from "../gqlQueries";
import { redirect } from "next/navigation";
import { LoginFormSchema } from "../zodSchemas/loginFormSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";

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

  if (data.errors) {
    return {
      data: fData,
      message: data.errors[0].message,
    };
  }
  redirect("/auth/signin");
}

export async function signIn(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  console.log("sign in>>");
  const fData = Object.fromEntries(formData.entries());
  const validateFields = LoginFormSchema.safeParse(fData);
  if (!validateFields.success) {
    return {
      data: fData,
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const variables = {
    signInInput: {
      email: validateFields.data.email,
      password: validateFields.data.password,
    },
  };
  const data = await fetchGraphql(print(LOGIN_USER_MUTATION), variables);

  if (data.errors) {
    return {
      data: fData,
      message: data.errors[0].message,
    };
  }

  // create a session for the user

  await createSession({
    user: {
      id: data?.signIn?.id,
      name: data?.signIn?.name,
      email: data?.signIn?.email,
      avatar: data?.signIn?.avatar,
    },
    accessToken: data.signIn.accessToken,
  });

  revalidatePath("/");
  redirect("/");
}
