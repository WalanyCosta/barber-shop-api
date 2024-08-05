import { type TimeScheduleModel } from '@/domain/model/time-schedule-model'

export interface LoadTimeSchedulesByDateAndIdsRepository {
  loadByDateAndIds: (
    date: string,
    ids: string[],
  ) => Promise<TimeScheduleModel[]>
}
