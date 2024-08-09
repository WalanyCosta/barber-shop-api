import { DateInvalidError } from '@/domain/errors/date-invalid-error'
import { type LoadTimeSchedule } from '@/domain/protocols/presentation'
import { NotExistsRegister } from '@/presentation/errors'
import { type Controller } from '@/presentation/protocols/controller'
import {
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/protocols/http'
import { type Validator } from '@/presentation/protocols/validator'

export class LoadTimeScheduleController implements Controller {
  constructor(
    private readonly loadTimeSchedule: LoadTimeSchedule,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const barberId = httpRequest.params.barberId
      const dateSchedule = httpRequest.query.dateSchedule

      const error = this.validator.validate({ barberId, dateSchedule })

      if (error) {
        return {
          statusCode: 403,
          body: error,
        }
      }

      await this.loadTimeSchedule.loadByBarberIDAndDate(barberId, dateSchedule)
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
