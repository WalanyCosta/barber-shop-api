import { type LoadBarbers } from '@/domain/protocols/presentation/barber/load-barbers'
import { type Controller } from '@/presentation/protocols/controller'
import {
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/protocols/http'

export class LoadBarbersController implements Controller {
  constructor(private readonly loadBarbers: LoadBarbers) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const response = await this.loadBarbers.load()
      return {
        statusCode: 200,
        body: response,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      }
    }
  }
}
