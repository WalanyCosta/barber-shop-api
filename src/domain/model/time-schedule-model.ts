import { type ScheduleModel } from './schedule-model'

export class TimeScheduleModel {
  readonly id?: string
  readonly dateSchedule: string
  readonly timeSchedule: number
  readonly scheduleId: string
  readonly schedule?: ScheduleModel

  constructor(
    id: string,
    dateSchedule: string,
    timeSchedule: number,
    scheduleId: string,
  ) {
    this.id = id
    this.dateSchedule = dateSchedule
    this.timeSchedule = timeSchedule
    this.scheduleId = scheduleId
  }
}
