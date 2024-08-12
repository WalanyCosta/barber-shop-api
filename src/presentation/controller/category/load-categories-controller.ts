import { type LoadCategories } from '@/domain/protocols/presentation'
import { type Controller } from '@/presentation/protocols/controller'
import {
  type HttpRequest,
  type HttpResponse,
} from '@/presentation/protocols/http'

export class LoadCategoriesController implements Controller {
  constructor(private readonly loadCategories: LoadCategories) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categories = await this.loadCategories.load()
      return {
        statusCode: 200,
        body: categories,
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      }
    }
  }
}
