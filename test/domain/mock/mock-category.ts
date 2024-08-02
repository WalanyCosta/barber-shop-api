import {
  mockArrayCategoryModel,
  mockCategoryModel,
} from '../../helpers/mock-category-model'
import { type CategoryModel } from '../model/category-model'
import {
  type LoadCategoriesRepository,
  type LoadCategoryByIdRepository,
} from '@/domain/protocols/infra/db'

export const makeLoadCategoriesRepository = (): LoadCategoriesRepository => {
  class LoadCategoriesRepositoryStub implements LoadCategoriesRepository {
    async load(): Promise<CategoryModel[]> {
      return await Promise.resolve(mockArrayCategoryModel)
    }
  }

  return new LoadCategoriesRepositoryStub()
}

export const makeLoadCategoryByIdRepositoryStub =
  (): LoadCategoryByIdRepository => {
    class LoadCategoryByIdRepositoryStub implements LoadCategoryByIdRepository {
      async loadById(id: string): Promise<CategoryModel | null> {
        return await Promise.resolve(mockCategoryModel)
      }
    }

    return new LoadCategoryByIdRepositoryStub()
  }
