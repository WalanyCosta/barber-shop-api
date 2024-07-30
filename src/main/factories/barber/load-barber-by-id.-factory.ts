import { type Controller } from '@/presentation/protocols/controller'
import { DbLoadBarberById } from '@/domain/usecase'
import { BarberRepository } from '@/infra/db/prisma'
import { LoadBarberByIdController } from '@/presentation/controller'

export const makeLoadBarberByIdFactory = (): Controller => {
  const barberRepository = new BarberRepository()
  const dbLoadBarberById = new DbLoadBarberById(barberRepository)
  const loadBarberByIdController = new LoadBarberByIdController(dbLoadBarberById)

  return loadBarberByIdController
}
