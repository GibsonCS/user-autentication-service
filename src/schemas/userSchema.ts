import z from "zod";

export const userValidation = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email()
})

export type UserInput = z.infer<typeof userValidation>