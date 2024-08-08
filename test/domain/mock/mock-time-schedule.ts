import {
  type ScheduleModel,
  type StatusSchedule,
} from '@/domain/model/schedule-model'
import { TimeScheduleModel } from '@/domain/model/time-schedule-model'
import {
  type LoadTimeSchedulesByDateAndIdsRepository,
  type LoadSchedulesByBarberIdRepository,
} from '@/domain/protocols/infra/db'
import { type VerifyDateIsCurrentOrPassed } from '../protocols/infra/date'
import { mockScheduleModel } from '../../helpers/mock-schedule-model'

export const makeLoadSchedulesByBarberIdRepositoryStub =
  (): LoadSchedulesByBarberIdRepository => {
    class LoadSchedulesByBarberIdRepositoryStub
      implements LoadSchedulesByBarberIdRepository
    {
      async loadByBarberId(
        barberId: string,
        statusSchedule: StatusSchedule,
      ): Promise<ScheduleModel[]> {
        return await Promise.resolve(mockScheduleModel)
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
        return await Promise.resolve([
          new TimeScheduleModel('any_id', 'any_date', 480, 'any_scheduleId'),
          new TimeScheduleModel('any_id', 'any_date', 495, 'any_scheduleId'),
        ])
      }
    }

    return new LoadTimeSchedulesByDateAndIdsRepositoryStub()
  }

export const makeVerifyDateIsCurrentOrPassedStub =
  (): VerifyDateIsCurrentOrPassed => {
    class VerifyDateIsPassedStub implements VerifyDateIsCurrentOrPassed {
      async isPassed(date: string): Promise<boolean> {
        return await Promise.resolve(true)
      }

      async isCurrent(date: string): Promise<boolean> {
        return await Promise.resolve(false)
      }
    }

    return new VerifyDateIsPassedStub()
  }
