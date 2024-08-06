import { DateInvalidError } from '@/domain/errors/date-invalid-error'
import { StatusSchedule } from '@/domain/model/schedule-model'
import { TimeScheduleModel } from '@/domain/model/time-schedule-model'
import { type VerifyDateIsCurrentOrPast } from '@/domain/protocols/infra/date'
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
    private readonly verifyDateIsCurrentOrPast: VerifyDateIsCurrentOrPast,
  ) {}

  async loadByBarberIDAndDate(
    barberId: string,
    dateSchedule: string,
  ): Promise<DbLoadTimeSchedulesResponse> {
    let timesSchedules: TimeScheduleModel[] = []

    const isDateValid =
      await this.verifyDateIsCurrentOrPast.isCurrentOrPast(dateSchedule)

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
