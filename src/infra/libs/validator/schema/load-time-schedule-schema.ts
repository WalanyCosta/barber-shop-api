import * as z from 'zod'

export const loadTimeScheduleSchema = z.object({
  barberId: z
    .string({
      required_error: 'barberId is required',
      invalid_type_error: 'barberId type is invalid',
    })
    .min(1, { message: 'barberId is empty' }),
})
