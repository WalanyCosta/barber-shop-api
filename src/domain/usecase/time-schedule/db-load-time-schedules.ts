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
    private readonly hourStart: number,
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

    return this.generateTimes(timesSchedules, isCurrent)
  }

  private generateTimes(
    timeSchedules: TimeScheduleModel[],
    isCurrent: boolean,
  ): DbLoadTimeSchedulesResponse {
    const INTERVALES = 15
    const timesContainer = []
    let hour = this.hourStart

    while (hour <= this.hourEnd) {
      timesContainer.push({
        times: TimeScheduleModel.convertHoursMinutesToHoursString(hour),
        disabled:
          TimeScheduleModel.verifyIsBeforeCurrent(hour) ||
          timeSchedules.some((timeSchedule) =>
            timeSchedule.verifyTimeExists(hour),
          ),
      })
      hour = TimeScheduleModel.calculateTime(INTERVALES, hour)
    }

    return timesContainer
  }
}
