import { type Authentication } from '@/domain/protocols/presentation'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'
import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'
import { type Validator } from '@/presentation/protocols/validator'

export class LoginController implements Controller {
  constructor (
    private readonly validator: Validator,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.body)
      if (error) {
        return {
          statusCode: 400,
          body: error
        }
      }

      const accessToken = await this.authentication.auth(httpRequest.body)

      return {
        statusCode: 200,
        body: accessToken
      }
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        return {
          statusCode: 401,
          body: err
        }
      }

      return {
        statusCode: 500,
        body: err
      }
    }
  }
}
