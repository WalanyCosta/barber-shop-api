import { type AddAccount } from './../../../domain/protocols/add-account'
import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols/controller'
import { EmailInUseError } from '../../errors/email-in-use-error'
import { type Validator } from '../../protocols/validator'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validator: Validator
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

      const accessToken = await this.addAccount.add(httpRequest.body)

      if (!accessToken) {
        return {
          statusCode: 403,
          body: new EmailInUseError()
        }
      }
      return {
        statusCode: 200,
        body: accessToken
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
