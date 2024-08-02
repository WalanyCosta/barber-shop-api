import { type LoadBarbers } from '@/domain/protocols/presentation/barber/load-barbers'
import { type Controller } from '@/presentation/protocols/controller'
import {
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/protocols/http'

export class LoadBarbersController implements Controller {
  constructor(private readonly loadBarbers: LoadBarbers) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadBarbers.load()
    return await Promise.resolve({
      statusCode: 400,
      body: [],
    })
  }
}
