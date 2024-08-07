import { DateInvalidError } from '@/domain/errors/date-invalid-error'
import { StatusSchedule } from '@/domain/model/schedule-model'
import { TimeScheduleModel } from '@/domain/model/time-schedule-model'
import {
  type VerifyDateIsCurrent,
  type VerifyDateIsPassed,
} from '@/domain/protocols/infra/date'
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
    private readonly verifyDateIsPassed: VerifyDateIsPassed,
    private readonly verifyDateIsCurrent: VerifyDateIsCurrent,
  ) {}

  async loadByBarberIDAndDate(
    barberId: string,
    dateSchedule: string,
  ): Promise<DbLoadTimeSchedulesResponse> {
    let timesSchedules: TimeScheduleModel[] = []

    const isDateValid = await this.verifyDateIsPassed.isPassed(dateSchedule)

    if (!isDateValid) {
      throw new DateInvalidError(
        'Não é possivel trazer horas com datas antigas',
      )
    }

    const barber = await this.loadBarberByIdRepository.loadById(barberId)

    if (!barber) {
      throw new NotExistsRegister('No exists register with id')
    }
    const schedules =
      await this.loadSchedulesByBarberIdRepository.loadByBarberId(
        barberId,
        StatusSchedule.WAITING,
      )

    if (schedules.length !== 0) {
      const scheduleIds = schedules.map((schedule) => schedule.id)

      timesSchedules =
        await this.loadTimeSchedulesByDateAndIdsRepository.loadByDateAndIds(
          dateSchedule,
          scheduleIds,
        )
    }

    return this.generateTimes(timesSchedules, dateSchedule)
  }

  private generateTimes(timeSchedules: TimeScheduleModel[], date: string): any {
    const INTERVALES = 15
    const timesContainer = []

    while (this.hourStart <= this.hourEnd) {
      timesContainer.push({
        times: TimeScheduleModel.convertHoursMinutesToHoursString(
          this.hourStart,
        ),
        disabled: timeSchedules.some(async (timeSchedule) => {
          await this.verifyDateIsCurrent.isCurrent(date)

          return timeSchedule.verifyTimeExists(this.hourStart)
        }),
      })
      this.hourStart = TimeScheduleModel.calculateTime(
        INTERVALES,
        this.hourStart,
      )
    }

    return timesContainer
  }
}
