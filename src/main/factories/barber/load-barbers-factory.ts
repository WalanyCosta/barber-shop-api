import { type Controller } from '@/presentation/protocols/controller'
import { DbLoadBarbers } from '@/domain/usecase'
import { BarberRepository } from '@/infra/db/prisma'
import { LoadBarbersController } from '@/presentation/controller'

export const makeLoadBarbersFactory = (): Controller => {
  const barberRepository = new BarberRepository()
  const dbLoadBarbers = new DbLoadBarbers(barberRepository)
  const loadBarbersController = new LoadBarbersController(dbLoadBarbers)

  return loadBarbersController
}
