import { type LoadCategoryById } from '@/domain/protocols/presentation'
import { NotExistsRegister } from '@/presentation/errors'
import { type Controller } from '@/presentation/protocols/controller'
import { type HttpRequest, type HttpResponse } from '@/presentation/protocols/http'

export class LoadCategoryByIdController implements Controller {
  constructor (private readonly loadCategoryById: LoadCategoryById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      await this.loadCategoryById.loadById(id)
      return {
        statusCode: 400,
        body: null
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
