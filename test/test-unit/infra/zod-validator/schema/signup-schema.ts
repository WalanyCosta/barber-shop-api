import * as z from 'zod'

export const signupSchema = z.object({
  name: z.string({ required_error: 'name is required. Please write name' })
})
