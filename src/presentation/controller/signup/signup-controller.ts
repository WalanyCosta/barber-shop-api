import { ValidationError } from '../../errors/validation-error'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols/controller'
import * as z from 'zod'

export class SignUpController implements Controller {
  validationschema = z.object({
    name: z.string({ required_error: 'name is required. Please write name' })
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
