import { StatusSchedule } from '@/domain/model/schedule-model'
import {
  type LoadTimeSchedulesByDateAndIdsRepository,
  type LoadSchedulesByBarberIdRepository,
} from '@/domain/protocols/infra/db'
import { type LoadBarberById } from '@/domain/protocols/presentation'
import { NotExistsRegister } from '@/presentation/errors'

export class DbLoadTimeSchedules {
  constructor(
    private readonly loadSchedulesByBarberIdRepository: LoadSchedulesByBarberIdRepository,
    private readonly loadBarberById: LoadBarberById,
    private readonly loadTimeSchedulesByDateAndIdsRepository: LoadTimeSchedulesByDateAndIdsRepository,
  ) {}

  async loadByBarberIDAndDate(
    barberId: string,
    dateSchedule: string,
  ): Promise<any> {
    const barber = await this.loadBarberById.loadById(barberId)

    if (!barber) {
      throw new NotExistsRegister('No exists register with id')
    }
    const barbers = await this.loadSchedulesByBarberIdRepository.loadByBarberId(
      barberId,
      StatusSchedule.WAITING,
    )

    const barberIds = barbers.map((barber) => barber.id)

    await this.loadTimeSchedulesByDateAndIdsRepository.loadByDateAndIds(
      dateSchedule,
      barberIds,
    )

    return [
      { times: '08:00', disabled: false },
      { times: '08:00', disabled: false },
    ]
  }
}
