import {
  type ScheduleModel,
  type StatusSchedule,
} from '@/domain/model/schedule-model'
import { TimeScheduleModel } from '@/domain/model/time-schedule-model'
import {
  type LoadTimeSchedulesByDateAndIdsRepository,
  type LoadSchedulesByBarberIdRepository,
} from '@/domain/protocols/infra/db'

export const makeLoadSchedulesByBarberIdRepositoryStub =
  (): LoadSchedulesByBarberIdRepository => {
    class LoadSchedulesByBarberIdRepositoryStub
      implements LoadSchedulesByBarberIdRepository
    {
      async loadByBarberId(
        barberId: string,
        statusSchedule: StatusSchedule,
      ): Promise<ScheduleModel[]> {
        return await Promise.resolve([
          {
            id: 'any_id',
            status: 'WAITING',
            total_time: 0,
            barberId: 'any_barberId',
          },
          {
            id: 'any_id',
            status: 'WAITING',
            total_time: 0,
            barberId: 'any_barberId',
          },
        ])
      }
    }

    return new LoadSchedulesByBarberIdRepositoryStub()
  }

export const makeLoadTimeSchedulesByDateAndIdsRepositoryStub =
  (): LoadTimeSchedulesByDateAndIdsRepository => {
    class LoadTimeSchedulesByDateAndIdsRepositoryStub
      implements LoadTimeSchedulesByDateAndIdsRepository
    {
      async loadByDateAndIds(
        date: string,
        ids: string[],
      ): Promise<TimeScheduleModel[]> {
        const timeSchedule = new TimeScheduleModel(
          'any_id',
          'any_date',
          950,
          'any_scheduleId',
        )
        return await Promise.resolve(new Array(timeSchedule))
      }
    }

    return new LoadTimeSchedulesByDateAndIdsRepositoryStub()
  }
