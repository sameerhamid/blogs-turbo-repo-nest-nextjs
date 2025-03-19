import { z } from "zod";

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title should be at least 5 characters long")
    .max(100, "Title should be at most 100 characters long"),
  content: z.string().min(5, "Title should be at least 5 characters long"),
  thumbnail: z.instanceof(File).optional(),
  tags: z
    .string()
    .min(1, "Tags is required")
    .refine((value) => {
      //   empty sapce between coma not allowed
      return value.split(",").every((tag) => tag.trim() !== "");
    }),
  published: z.string().transform((value) => value === "on"),
});
