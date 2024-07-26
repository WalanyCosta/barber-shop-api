import { type SearchServices } from '@/domain/protocols/presentation/search-service'
import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'

export class SearchServicesController implements Controller {
  constructor (private readonly searchServices: SearchServices) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { typeQuery, query } = httpRequest?.query
      const services = await this.searchServices.filter(typeQuery, query)
      return await Promise.resolve({
        statusCode: 200,
        body: services
      })
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
