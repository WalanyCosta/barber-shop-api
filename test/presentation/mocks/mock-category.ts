import { type CategoryModel } from '@/domain/model/category-model'
import { type LoadCategoryById, type LoadCategories } from '@/domain/protocols/presentation'

export const mockArrayCategoryModel = [
  {
    id: 'any_id',
    category: 'any_category'
  },
  {
    id: 'other_id',
    category: 'other_category'
  }
]

export const mockCategoryModel = {
  id: 'any_id',
  category: 'any_category'
}

export const makeLoadCategoriesStub = (): LoadCategories => {
  class LoadCategoriesStub implements LoadCategories {
    async load (): Promise<CategoryModel[]> {
      return await Promise.resolve(mockArrayCategoryModel)
    }
  }

  return new LoadCategoriesStub()
}

export const makeLoadCategoryByIdStub = (): LoadCategoryById => {
  class LoadCategoryByIdStub implements LoadCategoryById {
    async loadById (id: string): Promise<CategoryModel | null> {
      return await Promise.resolve(mockCategoryModel)
    }
  }

  return new LoadCategoryByIdStub()
}
