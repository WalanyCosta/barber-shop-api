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

  calculateTime(intervale: number, hourStart: number): number {
    return hourStart + intervale
  }

  convertHoursMinutesToHoursString(minutesAmount: number = 0): string {
    const hours = Math.floor(minutesAmount / 60)
    const minutes = minutesAmount % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }
}
