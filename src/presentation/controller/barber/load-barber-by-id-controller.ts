import { type LoadBarberById } from '@/domain/protocols/presentation/barber'
import { NotExistsRegister } from '@/presentation/errors'
import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'

export class LoadBarberByIdController implements Controller {
  constructor (private readonly loadBarberById: LoadBarberById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const barber = await this.loadBarberById.loadById(id)
      return {
        statusCode: 200,
        body: barber
      }
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
