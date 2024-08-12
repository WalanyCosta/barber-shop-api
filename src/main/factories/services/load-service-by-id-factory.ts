import { type Controller } from '@/presentation/protocols/controller'
import { ServicesRepository } from '@/infra/db/prisma'
import { LoadServiceByIdController } from '@/presentation/controller'
import { DbLoadServiceById } from '@/domain/usecase/service/db-load-service-by-id'

export const makeLoadServiceByIdController = (): Controller => {
  const servicesRepository = new ServicesRepository()
  const dbLoadServiceById = new DbLoadServiceById(servicesRepository)
  const loadServiceByIdController = new LoadServiceByIdController(
    dbLoadServiceById,
  )

  return loadServiceByIdController
}
