import * as z from 'zod'

export const searchServiceSchema = z.object({
  typeQuery: z.enum(['service', 'category'], {
    required_error: 'typeQuery is required.',
  }),
  query: z
    .string({ required_error: 'query is required.' })
    .min(1, { message: 'query is empty. Please to write query.' }),
})
