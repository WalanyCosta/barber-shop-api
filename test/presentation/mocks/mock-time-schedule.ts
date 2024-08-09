import {
  type DbLoadTimeSchedulesResponse,
  type LoadTimeSchedule,
} from '@/domain/protocols/presentation'

export const mockResultTimes = [
  { times: '08:00', disabled: false },
  { times: '08:15', disabled: false },
  { times: '08:30', disabled: false },
  { times: '08:45', disabled: false },
]

export const makeLoadTimeScheduleStub = (): LoadTimeSchedule => {
  class LoadTimeScheduleStub implements LoadTimeSchedule {
    async loadByBarberIDAndDate(
      barberId: string,
      date: string,
    ): Promise<DbLoadTimeSchedulesResponse> {
      return await Promise.resolve(mockResultTimes)
    }
  }

  return new LoadTimeScheduleStub()
}
