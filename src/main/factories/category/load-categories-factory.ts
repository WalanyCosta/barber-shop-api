import { type Controller } from '@/presentation/protocols/controller'
import { DbLoadCategories } from '@/domain/usecase'
import { CategoryRepository } from '@/infra/db/prisma'
import { LoadCategoriesController } from '@/presentation/controller'

export const makeLoadCategoriesFactory = (): Controller => {
  const categoryRepository = new CategoryRepository()
  const dbLoadCategories = new DbLoadCategories(categoryRepository)
  const loadCategoriesController = new LoadCategoriesController(
    dbLoadCategories,
  )

  return loadCategoriesController
}
