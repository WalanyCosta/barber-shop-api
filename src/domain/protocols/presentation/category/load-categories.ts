import { type CategoryModel } from '@/domain/model/category-model'

export interface LoadCategories {
  load: () => Promise<CategoryModel[]>
}
