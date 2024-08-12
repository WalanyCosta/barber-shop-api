import { searchServiceSchema } from '@/infra/libs/validator/schema/search-service-schema'
import { type Controller } from '@/presentation/protocols/controller'
import { ServicesRepository } from '@/infra/db/prisma'
import { DbSearchServices } from '@/domain/usecase/service/db-search-services'
import { SearchServicesController } from '@/presentation/controller'
import { ZodValidator } from '@/infra/libs'

export const makeSearchServicesFactory = (): Controller => {
  const servicesRepository = new ServicesRepository()
  const dbSearchServices = new DbSearchServices(servicesRepository)
  const zodValidator = new ZodValidator(searchServiceSchema)
  const loadServicesController = new SearchServicesController(
    dbSearchServices,
    zodValidator,
  )

  return loadServicesController
}
