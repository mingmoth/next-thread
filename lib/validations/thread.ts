import * as z from "zod"

export const ThreadValidation = z.object({
  thread: z.string()
    .min(3, { message: "Thread must be at least 3 characters" })
    .max(200),
  accountId: z.string(),
})

export const CommentValidation = z.object({
  comment: z.string()
    .min(3, { message: "Comment must be at least 3 characters" })
    .max(200),
  accountId: z.string(),
})