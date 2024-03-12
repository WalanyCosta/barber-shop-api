import { type LoadAccountByToken } from '../../domain/protocols/presentation/load-account-by-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Middleware } from '../protocols/middlawre'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const id = await this.loadAccountByToken.load(accessToken)

        if (id) {
          return await Promise.resolve({
            statusCode: 200
          })
        }
      }

      return {
        statusCode: 403,
        body: new AccessDeniedError()
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}