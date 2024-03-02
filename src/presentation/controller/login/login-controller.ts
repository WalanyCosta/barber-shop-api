import { type Controller, type HttpRequest, type HttpResponse } from '../../protocols/controller'
import { type Validator } from '../../protocols/validator'

export class LoginController implements Controller {
  constructor (private readonly validator: Validator) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validator.validate(httpRequest.body)
    return await Promise.resolve(httpRequest.body)
  }
}
