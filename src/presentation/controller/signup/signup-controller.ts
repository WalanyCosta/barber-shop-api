import { ValidationError } from '../../errors/validation-error'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols/controller'
import * as z from 'zod'

export class SignUpController implements Controller {
  validationschema = z.object({
    name: z.string({ required_error: 'name is required. Please write name' })
      .min(1, { message: 'name is empty. Please write name' }),
    email: z.string({ required_error: 'email is required. Please write email' })
      .min(1, { message: 'email is empty. Please write email' })
      .email({ message: 'email is invalid. Please write email correctly' }),
    password: z.string({ required_error: 'Password is invalid. Please write password' })
      .regex(new RegExp('.*[A-Z].*'), 'Password is weak. Please write password')
      .regex(new RegExp('.*[a-z].*'), 'Password is weak. Please write password')
      .regex(new RegExp('.*\\d.*'), 'Password is weak. Please write password')
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        'Password is weak. Please write password'
      )
      .min(8, 'Password must be at least 8 characters in length'),
    phone: z.string({ required_error: 'phone is required. Please write phone' })
      .min(1, 'phone is empty. Please write phone')
  })

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = this.validationschema.safeParse(httpRequest.body)

    if (!response.success) {
      const ZodError = JSON.parse(response.error.toString())
      return {
        statusCode: 400,
        body: new ValidationError(ZodError[0].message)
      }
    }

    return {
      statusCode: 200
    }
  }
}
