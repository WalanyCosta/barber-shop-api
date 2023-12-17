import * as z from 'zod'

export const signupSchema = z.object({
  name: z.string({ required_error: 'name is required. Please write name' })
    .min(1, 'name is empty. Please write name'),
  email: z.string({ required_error: 'email is required. Please write email' })
    .min(1, 'email is empty. Please write email')
    .email('email is invalid. Please write email correctly')
})
