import { type CategoryModel } from '@/domain/model/category-model'
import { type LoadCategoryByIdRepository } from '@/domain/protocols/infra/db/category/load-category-by-id-repository'
import { type LoadCategoryById } from '@/domain/protocols/presentation'
import { NotExistsRegister } from '@/presentation/errors'

export class DbLoadCategoryById implements LoadCategoryById {
  constructor(
    private readonly loadCategoryByIdRepository: LoadCategoryByIdRepository,
  ) {}

  async loadById(id: string): Promise<CategoryModel | null> {
    const category = await this.loadCategoryByIdRepository.loadById(id)
    if (!category) {
      throw new NotExistsRegister('Not exists register with this id')
    }
    return category
  }
}
