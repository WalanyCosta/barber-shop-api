import { type CategoryModel } from '@/domain/model/category-model'
import { type LoadCategoriesRepository } from '@/domain/protocols/infra/db'
import { type LoadCategories } from '@/domain/protocols/presentation'

export class DbLoadCategories implements LoadCategories {
  constructor (private readonly loadCategoriesRepository: LoadCategoriesRepository) {}
  async load (): Promise<CategoryModel[]> {
    const categories = await this.loadCategoriesRepository.load()
    return categories
  }
}
