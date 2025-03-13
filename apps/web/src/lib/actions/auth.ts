"use server";

import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";

export async function signUp(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const data = Object.fromEntries(formData.entries());
  const validateFields = SignUpFormSchema.safeParse(data);
  return undefined;
}
