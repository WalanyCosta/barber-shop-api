import {
  type ScheduleModel,
  type StatusSchedule,
} from '@/domain/model/schedule-model'

export interface LoadSchedulesByBarberIdRepository {
  loadByBarberId: (
    barberId: string,
    statusSchedule: StatusSchedule,
  ) => Promise<ScheduleModel[]>
}
