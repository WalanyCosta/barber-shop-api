import { StatusSchedule } from '@/domain/model/schedule-model'
import { type LoadSchedulesByBarberIdRepository } from '@/domain/protocols/infra/db'
import { type LoadBarberById } from '@/domain/protocols/presentation'
import { NotExistsRegister } from '@/presentation/errors'

export class DbLoadTimeSchedules {
  constructor(
    private readonly loadSchedulesByBarberIdRepository: LoadSchedulesByBarberIdRepository,
    private readonly loadBarberById: LoadBarberById,
  ) {}

  async loadByBarberIDAndDate(barberId: string): Promise<any> {
    const barber = await this.loadBarberById.loadById(barberId)

    if (!barber) {
      throw new NotExistsRegister('No exists register with id')
    }
    await this.loadSchedulesByBarberIdRepository.loadByBarberId(
      barberId,
      StatusSchedule.WAITING,
    )

    return [
      { times: '08:00', disabled: false },
      { times: '08:00', disabled: false },
    ]
  }
}
