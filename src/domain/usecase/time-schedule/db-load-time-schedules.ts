import { StatusSchedule } from '@/domain/model/schedule-model'
import { type LoadSchedulesByBarberIdRepository } from '@/domain/protocols/infra/db'

export class DbLoadTimeSchedules {
  constructor(
    private readonly loadSchedulesByBarberIdRepository: LoadSchedulesByBarberIdRepository,
  ) {}

  async loadByBarberIDAndDate(barberId: string): Promise<any> {
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
