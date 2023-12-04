import { ValidationError } from './../../errors/validation-error'
import { type AddAccountRepository } from './../../../domain/protocols/add-account'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols/controller'
import * as z from 'zod'
import { EmailInUseError } from '../../errors/email-in-use-error'

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

  constructor (private readonly addAccountRepository: AddAccountRepository) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validationschema.safeParse(httpRequest.body)

      if (!error.success) {
        const ZodError = JSON.parse(error.error.toString())
        return {
          statusCode: 400,
          body: new ValidationError(ZodError[0].message)
        }
      }

      const accessToken = await this.addAccountRepository.add(httpRequest.body)

      if (!accessToken) {
        return {
          statusCode: 403,
          body: new EmailInUseError()
        }
      }
      return {
        statusCode: 200
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
