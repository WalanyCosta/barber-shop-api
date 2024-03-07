import { type LoadServices } from '../../domain/protocols/presentation/load-services'
import { type Controller, type HttpRequest, type HttpResponse } from '../protocols/controller'

export class LoadServicesController implements Controller {
  constructor (private readonly loadServices: LoadServices) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const services = await this.loadServices.load()
      if (!services) {
        return {
          statusCode: 204,
          body: []
        }
      }

      return await Promise.resolve({
        statusCode: 200
      })
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}
