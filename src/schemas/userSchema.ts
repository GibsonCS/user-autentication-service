import z from "zod";

export const userValidation = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email()
})

export const loginValidation = z.object({
    username: z.string(),
    password: z.string()
})

export type UserInput = z.infer<typeof userValidation>
export type LoginInput = z.infer<typeof loginValidation>