import { ValidationError } from '@/presentation/errors/validation-error'
import { type Validator } from '@/presentation/protocols/validator'
import type * as z from 'zod'

export class ZodValidator implements Validator {
  constructor (
    private readonly schema: z.ZodObject<any, 'strip', z.ZodTypeAny, any, any>
  ) {}

  validate (input: any): Error | null {
    const response = this.schema.safeParse(input)
    if (!response.success) {
      console.log(response.error)
      return new ValidationError(JSON.parse(response.error.toString())[0].message)
    }
    return null
  }
}
