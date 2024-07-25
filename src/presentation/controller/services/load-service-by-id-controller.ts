import { type LoadServiceById } from '@/domain/protocols/presentation/load-service-by-id'
import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'

export class LoadServiceByIdController implements Controller {
  constructor (private readonly loadServiceById: LoadServiceById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const service = await this.loadServiceById.loadById(id)

      if (!service) {
        return {
          statusCode: 400,
          body: {
            error: 'Serviço não encontrado!'
          }
        }
      }
      return { statusCode: 200, body: null }
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          error
        }
      }
    }
  }
}
