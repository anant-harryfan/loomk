import { z } from "zod";

export const createCommentSchema = z.object({
    comment: z.string().min(1, { message: 'Empty message karna hai to: "ㅤㅤㅤㅤㅤㅤㅤ" u+3164 dalde'})
})
