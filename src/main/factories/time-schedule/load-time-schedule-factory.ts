import { DbLoadTimeSchedules } from './../../../domain/usecase/time-schedule/db-load-time-schedules'
import { BarberRepository, TimeScheduleRepository } from '@/infra/db/prisma'
import { ScheduleRepository } from '@/infra/db/prisma/repositories/schedule/schedule-repository'
import { DayjsAdapter, ZodValidator } from '@/infra/libs'
import { loadTimeScheduleSchema } from '@/infra/libs/validator'
import { LoadTimeScheduleController } from '@/presentation/controller'
import { type Controller } from '@/presentation/protocols/controller'

export const makeLoadTimeScheduleFactory = (): Controller => {
  const barberRepository = new BarberRepository()
  const scheduleRepository = new ScheduleRepository()
  const timeScheduleRepository = new TimeScheduleRepository()
  const dayjsAdapter = new DayjsAdapter()
  const zodValidator = new ZodValidator(loadTimeScheduleSchema)

  const dbLoadTimeSchedules = new DbLoadTimeSchedules(
    scheduleRepository,
    barberRepository,
    timeScheduleRepository,
    480,
    1080,
    dayjsAdapter,
  )
  const loadTimeSchedulesController = new LoadTimeScheduleController(
    dbLoadTimeSchedules,
    zodValidator,
  )

  return loadTimeSchedulesController
}
