import { type LoadBarberById } from '@/domain/protocols/presentation/barber'
import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'

export class LoadBarberByIdController implements Controller {
  constructor (private readonly loadBarberById: LoadBarberById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params
    await this.loadBarberById.loadById(id)
    return await Promise.resolve({
      statusCode: 400,
      body: null
    })
  }
}
