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
    const schedules =
      await this.loadSchedulesByBarberIdRepository.loadByBarberId(
        barberId,
        StatusSchedule.WAITING,
      )

    const scheduleIds = schedules.map((schedule) => schedule.id)

    const timesSchedules =
      await this.loadTimeSchedulesByDateAndIdsRepository.loadByDateAndIds(
        dateSchedule,
        scheduleIds,
      )

    return this.generate(timesSchedules)
  }

  private generate(timeSchedules: TimeScheduleModel[]): any {
    const INTERVALES = 15
    const hours = []

    while (this.hourStart <= this.hourEnd) {
      hours.push({
        times: TimeScheduleModel.convertHoursMinutesToHoursString(
          this.hourStart,
        ),
        disabled: timeSchedules.some((timeSchedule) =>
          timeSchedule.verifyIfTimeExists(this.hourStart),
        ),
      })
      this.hourStart = TimeScheduleModel.calculateTime(
        INTERVALES,
        this.hourStart,
      )
    }

    return hours
  }
}
