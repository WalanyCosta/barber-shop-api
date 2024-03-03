import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string({ required_error: 'email is required. Please write email' })
    .min(1, 'email is empty. Please write email')
    .email('email is invalid. Please write email correctly')
})
