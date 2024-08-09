import { DateInvalidError } from '@/domain/errors/date-invalid-error'
import { type LoadTimeSchedule } from '@/domain/protocols/presentation'
import { NotExistsRegister } from '@/presentation/errors'
import { type Controller } from '@/presentation/protocols/controller'
import {
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/protocols/http'

export class LoadTimeScheduleController implements Controller {
  constructor(private readonly loadTimeSchedule: LoadTimeSchedule) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params, query } = httpRequest
      await this.loadTimeSchedule.loadByBarberIDAndDate(
        params.barberId,
        query.dateSchedule,
      )
      return await Promise.resolve({
        statusCode: 204,
        body: null,
      })
    } catch (error) {
      if (
        error instanceof DateInvalidError ||
        error instanceof NotExistsRegister
      ) {
        return {
          statusCode: 400,
          body: error,
        }
      }
      return {
        statusCode: 500,
        body: error,
      }
    }
  }
}
