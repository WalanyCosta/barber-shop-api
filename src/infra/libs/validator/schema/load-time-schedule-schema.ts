import * as z from 'zod'

export const loadTimeScheduleSchema = z.object({
  barberId: z
    .string({
      required_error: 'barberId is required',
      invalid_type_error: 'barberId type is invalid',
    })
    .min(1, { message: 'barberId is empty' }),
  dateSchedule: z
    .string({
      required_error: 'dateSchedule is required',
      invalid_type_error: 'dateSchedule type is invalid',
    })
    .min(1, { message: 'dateSchedule is empty' })
    .datetime({ message: 'dateSchedule format is invalid' }),
})
