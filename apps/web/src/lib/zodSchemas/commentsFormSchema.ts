import { z } from "zod";
export const CommentFormSchema = z.object({
  content: z
    .string()
    .min(5, {
      message: "Comment must contain at least 5 character.",
    })
    .trim(),
  postId: z.string(),
});
