import { type CategoryModel } from '@/domain/model/category-model'

export interface LoadCategoryById {
  loadById: (id: string) => Promise<CategoryModel>
}
