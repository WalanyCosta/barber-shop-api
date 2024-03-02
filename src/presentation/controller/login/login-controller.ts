import { type Authentication } from '../../../domain/protocols/authentication'
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

      if (!accessToken) {
        return {
          statusCode: 401,
          body: new UnauthorizedError('User not exists')
        }
      }
      return await Promise.resolve(httpRequest.body)
    } catch (err) {
      return {
        statusCode: 401,
        body: err
      }
    }
  }
}
