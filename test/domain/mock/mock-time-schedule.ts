import {
  type ScheduleModel,
  type StatusSchedule,
} from '../model/schedule-model'
import { type LoadSchedulesByBarberIdRepository } from '../protocols/infra/db'

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
