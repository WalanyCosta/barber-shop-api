import { type CategoryModel } from '../model/category-model'
import { type LoadCategoriesRepository } from '../protocols/infra/db'

export const mockArrayCategoryModel: CategoryModel[] = [
  { id: 'any_id', category: 'any_category' },
  { id: 'other_id', category: 'other_category' }
]

export const makeLoadCategoriesRepository = (): LoadCategoriesRepository => {
  class LoadCategoriesRepositoryStub implements LoadCategoriesRepository {
    async load (): Promise<CategoryModel[]> {
      return await Promise.resolve(mockArrayCategoryModel)
    }
  }

  return new LoadCategoriesRepositoryStub()
}
