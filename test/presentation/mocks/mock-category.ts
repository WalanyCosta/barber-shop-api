import { type CategoryModel } from '@/domain/model/category-model'
import {
  type LoadCategoryById,
  type LoadCategories,
} from '@/domain/protocols/presentation'
import {
  mockArrayCategoryModel,
  mockCategoryModel,
} from '../../helper/mock-category-model'

export const makeLoadCategoriesStub = (): LoadCategories => {
  class LoadCategoriesStub implements LoadCategories {
    async load(): Promise<CategoryModel[]> {
      return await Promise.resolve(mockArrayCategoryModel)
    }
  }

  return new LoadCategoriesStub()
}

export const makeLoadCategoryByIdStub = (): LoadCategoryById => {
  class LoadCategoryByIdStub implements LoadCategoryById {
    async loadById(id: string): Promise<CategoryModel | null> {
      return await Promise.resolve(mockCategoryModel)
    }
  }

  return new LoadCategoryByIdStub()
}
