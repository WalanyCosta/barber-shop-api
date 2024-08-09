import {
  type DbLoadTimeSchedulesResponse,
  type LoadTimeSchedule,
} from '@/domain/protocols/presentation'

export const makeLoadTimeScheduleStub = (): LoadTimeSchedule => {
  class LoadTimeScheduleStub implements LoadTimeSchedule {
    async loadByBarberIDAndDate(
      barberId: string,
      date: string,
    ): Promise<DbLoadTimeSchedulesResponse> {
      return await Promise.resolve([{ times: '08:00', disabled: true }])
    }
  }

  return new LoadTimeScheduleStub()
}
