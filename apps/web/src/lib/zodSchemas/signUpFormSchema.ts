import { z } from "zod";
export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email().trim().toLowerCase(),
  password: z
    .string()
    .min(8, {
      message: "contain least 8 characters long.",
    })
    .regex(/[a-zA-Z]/, {
      message: "contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "contain at least one special character.",
    }),
});
