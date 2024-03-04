import { type Authentication } from '../../../domain/protocols/presentation/authentication'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols/controller'
import { type Validator } from '../../protocols/validator'

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
