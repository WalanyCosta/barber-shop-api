import { type SearchServices } from '@/domain/protocols/presentation/service/search-service'
import { type Controller } from '@/presentation/protocols/controller'
import {
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/protocols/http'
import { type Validator } from '@/presentation/protocols/validator'

export class SearchServicesController implements Controller {
  constructor(
    private readonly searchServices: SearchServices,
    private readonly validator: Validator,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(httpRequest.query)
      if (error) {
        return {
          statusCode: 400,
          body: error,
        }
      }
      const services = await this.searchServices.filter(
        httpRequest.query?.typeQuery,
        httpRequest.query?.query,
      )
      return {
        statusCode: 200,
        body: services,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      }
    }
  }
}
