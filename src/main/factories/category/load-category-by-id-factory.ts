import { type Controller } from '@/presentation/protocols/controller'
import { DbLoadCategoryById } from '@/domain/usecase'
import { CategoryRepository } from '@/infra/db/prisma'
import { LoadCategoryByIdController } from '@/presentation/controller'

export const makeLoadCategoryByIdRepositoryFactory = (): Controller => {
  const categoryRepository = new CategoryRepository()
  const dbLoadCategoryById = new DbLoadCategoryById(categoryRepository)
  const loadCategoryByIdController = new LoadCategoryByIdController(
    dbLoadCategoryById,
  )

  return loadCategoryByIdController
}
