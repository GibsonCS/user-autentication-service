import z from 'zod'

export const userSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email('invalid email type'),
})

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

const userOutputSchema = userSchema.omit({ password: true })

export type UserInput = z.infer<typeof userSchema>
export type UserOutput = z.infer<typeof userOutputSchema>
export type LoginInput = z.infer<typeof loginSchema>
