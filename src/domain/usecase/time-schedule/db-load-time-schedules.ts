import { StatusSchedule } from '@/domain/model/schedule-model'
import { TimeScheduleModel } from '@/domain/model/time-schedule-model'
import {
  type LoadTimeSchedulesByDateAndIdsRepository,
  type LoadSchedulesByBarberIdRepository,
  type LoadBarberByIdRepository,
} from '@/domain/protocols/infra/db'
import { NotExistsRegister } from '@/presentation/errors'

interface DbLoadTimeSchedulesResponse {
  timesSchedulesArray: Array<{
    times: number
    disabled: boolean
  }>
}

export class DbLoadTimeSchedules {
  constructor(
    private readonly loadSchedulesByBarberIdRepository: LoadSchedulesByBarberIdRepository,
    private readonly loadBarberByIdRepository: LoadBarberByIdRepository,
    private readonly loadTimeSchedulesByDateAndIdsRepository: LoadTimeSchedulesByDateAndIdsRepository,
    private hourStart: number,
    private readonly hourEnd: number,
  ) {}

  async loadByBarberIDAndDate(
    barberId: string,
    dateSchedule: string,
  ): Promise<DbLoadTimeSchedulesResponse> {
    const barber = await this.loadBarberByIdRepository.loadById(barberId)

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

    return this.generate()
  }

  private generate(): any {
    const INTERVALES = 15
    const hours = []
    const timeSchedule = new TimeScheduleModel(
      'any_id',
      'any_date',
      0,
      'any_scheduleId',
    )

    while (this.hourStart <= this.hourEnd) {
      hours.push({
        times: timeSchedule.convertHoursMinutesToHoursString(this.hourStart),
        disabled: false,
      })
      this.hourStart = timeSchedule.calculateTime(INTERVALES, this.hourStart)
    }

    return hours
  }
}
