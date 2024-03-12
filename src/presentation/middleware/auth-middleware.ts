import { type LoadAccountByToken } from '../../domain/protocols/presentation/load-account-by-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Middleware } from '../protocols/middlawre'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    const id = await this.loadAccountByToken.load(HttpRequest.headers['x-access-token'])

    if (id) {
      return await Promise.resolve({
        statusCode: 200
      })
    }
    return {
      statusCode: 403,
      body: new AccessDeniedError()
    }
  }
}
