import { LoadServicesController } from '@/presentation/controller/services/load-services-controller'
import { type Controller } from '@/presentation/protocols/controller'
import { DbLoadServices } from '@/domain/usecase/load-services-repository'
import { ServicesRepository } from '@/infra/db/prisma'

export const makeLoadServicesController = (): Controller => {
  const servicesRepository = new ServicesRepository()
  const dbLoadServices = new DbLoadServices(servicesRepository)
  const loadServicesController = new LoadServicesController(dbLoadServices)

  return loadServicesController
}
