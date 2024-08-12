import * as z from 'zod'

export const signupSchema = z.object({
  name: z
    .string({ required_error: 'name is required. Please write name' })
    .min(1, 'name is empty. Please write name'),
  email: z
    .string({ required_error: 'email is required. Please write email' })
    .min(1, 'email is empty. Please write email')
    .email('email is invalid. Please write email correctly'),
  password: z
    .string({ required_error: 'password is required. Please write password' })
    .regex(new RegExp('.*[A-Z].*'), 'Password is weak. Please write password')
    .regex(new RegExp('.*[a-z].*'), 'Password is weak. Please write password')
    .regex(new RegExp('.*\\d.*'), 'Password is weak. Please write password')
    .regex(
      new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
      'Password is weak. Please write password',
    )
    .min(8, 'Password must be at least 8 characters in length'),
  phone: z
    .string({ required_error: 'phone is required. Please write phone' })
    .min(1, 'phone is empty. Please write phone'),
})
