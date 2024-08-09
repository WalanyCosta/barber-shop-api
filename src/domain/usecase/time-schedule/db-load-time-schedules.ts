import { DateInvalidError } from '@/domain/errors/date-invalid-error'
import { StatusSchedule } from '@/domain/model/schedule-model'
import { TimeScheduleModel } from '@/domain/model/time-schedule-model'
import { type VerifyDateIsCurrentOrPassed } from '@/domain/protocols/infra/date'
import {
  type LoadTimeSchedulesByDateAndIdsRepository,
  type LoadSchedulesByBarberIdRepository,
  type LoadBarberByIdRepository,
} from '@/domain/protocols/infra/db'
import {
  type LoadTimeSchedule,
  type DbLoadTimeSchedulesResponse,
} from '@/domain/protocols/presentation'
import { NotExistsRegister } from '@/presentation/errors'

export class DbLoadTimeSchedules implements LoadTimeSchedule {
  constructor(
    private readonly loadSchedulesByBarberIdRepository: LoadSchedulesByBarberIdRepository,
    private readonly loadBarberByIdRepository: LoadBarberByIdRepository,
    private readonly loadTimeSchedulesByDateAndIdsRepository: LoadTimeSchedulesByDateAndIdsRepository,
    private hourStart: number,
    private readonly hourEnd: number,
    private readonly VerifyDateIsCurrentOrPassed: VerifyDateIsCurrentOrPassed,
  ) {}

  async loadByBarberIDAndDate(
    barberId: string,
    dateSchedule: string,
  ): Promise<DbLoadTimeSchedulesResponse> {
    let timesSchedules: TimeScheduleModel[] = []

    const isDateValid =
      await this.VerifyDateIsCurrentOrPassed.isPassed(dateSchedule)

    const isCurrent =
      await this.VerifyDateIsCurrentOrPassed.isCurrent(dateSchedule)

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

    return await this.generateTimes(timesSchedules, isCurrent)
  }

  private async generateTimes(
    timeSchedules: TimeScheduleModel[],
    isCurrent: boolean,
  ): Promise<DbLoadTimeSchedulesResponse> {
    const INTERVALES = 15
    const timesContainer = []

    while (this.hourStart <= this.hourEnd) {
      timesContainer.push({
        times: TimeScheduleModel.convertHoursMinutesToHoursString(
          this.hourStart,
        ),
        disabled: timeSchedules.some((timeSchedule) => {
          if (isCurrent) {
            return (
              timeSchedule.verifyIsBeforeCurrent(this.hourStart) ||
              timeSchedule.verifyTimeExists(this.hourStart)
            )
          }
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
