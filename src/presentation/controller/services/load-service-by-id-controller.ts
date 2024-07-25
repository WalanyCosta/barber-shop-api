import { type LoadServiceById } from '@/domain/protocols/presentation/load-service-by-id'
import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'

export class LoadServiceByIdController implements Controller {
  constructor (private readonly loadServiceById: LoadServiceById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params
    await this.loadServiceById.loadById(id)
    return { statusCode: 200, body: null }
  }
}
