import { z } from "zod";
export const LoginFormSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(1, {
    message: "Password must contain at least 1 character.",
  }),
});
