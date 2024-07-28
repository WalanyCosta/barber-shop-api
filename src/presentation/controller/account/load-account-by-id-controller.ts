import { type LoadAccountByIdOrEmail } from '@/domain/protocols/presentation/load-account-by-id'
import { NotExistsRegister } from '@/presentation/errors'
import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'

export class LoadAccountByIdController implements Controller {
  constructor (private readonly loadAccountByIdOrEmail: LoadAccountByIdOrEmail) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      await this.loadAccountByIdOrEmail.loadByIdOrEmail(id)

      return await Promise.resolve({
        statusCode: 400,
        body: null
      })
    } catch (error) {
      if (error instanceof NotExistsRegister) {
        return {
          statusCode: 400,
          body: error
        }
      }
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
