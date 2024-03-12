import { type LoadAccountByToken } from '../../domain/protocols/presentation/load-account-by-token'
import { type HttpRequest, type HttpResponse } from '../protocols/http'
import { type Middleware } from '../protocols/middlawre'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle (HttpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadAccountByToken.load(HttpRequest.headers['x-access-token'])
    return await Promise.resolve({
      statusCode: 200
    })
  }
}
