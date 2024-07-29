import { type CategoryModel } from '@/domain/model/category-model'
import { type LoadCategoryByIdRepository } from '@/domain/protocols/infra/db/category/load-category-by-id-repository'
import { type LoadCategoryById } from '@/domain/protocols/presentation'

export class DbLoadCategoryById implements LoadCategoryById {
  constructor (private readonly loadCategoryByIdRepository: LoadCategoryByIdRepository) {}
  async loadById (id: string): Promise<CategoryModel | null> {
    await this.loadCategoryByIdRepository.loadById(id)
    return null
  }
}
