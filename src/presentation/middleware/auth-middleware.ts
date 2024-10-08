import { type LoadAccountByToken } from '@/domain/protocols/presentation'
import { AccessDeniedError } from '@/presentation/errors/access-denied-error'
import {
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/protocols/http'
import { type Middleware } from '@/presentation/protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const id = await this.loadAccountByToken.load(accessToken)

        if (id) {
          return {
            statusCode: 200,
            body: id,
          }
        }
      }

      return {
        statusCode: 403,
        body: new AccessDeniedError(),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      }
    }
  }
}
