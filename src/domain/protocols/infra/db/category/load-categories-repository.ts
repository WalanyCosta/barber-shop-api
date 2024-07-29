import { type CategoryModel } from '@/domain/model/category-model'

export interface LoadCategoriesRepository {
  load: () => Promise<CategoryModel[]>
}
