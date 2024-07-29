import { type CategoryModel } from '@/domain/model/category-model'

export interface LoadCategoryByIdRepository {
  loadById: (id: string) => Promise<CategoryModel | null>
}
