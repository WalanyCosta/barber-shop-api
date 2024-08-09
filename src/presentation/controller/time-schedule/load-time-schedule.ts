import { type LoadTimeSchedule } from '@/domain/protocols/presentation'
import { type Controller } from '@/presentation/protocols/controller'
import {
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/protocols/http'

export class LoadTimeScheduleController implements Controller {
  constructor(private readonly loadTimeSchedule: LoadTimeSchedule) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { params, query } = httpRequest
    await this.loadTimeSchedule.loadByBarberIDAndDate(
      params.barberId,
      query.dateSchedule,
    )
    return await Promise.resolve({
      statusCode: 204,
      body: null,
    })
  }
}
