import { type ScheduleModel } from './schedule-model'

export class TimeScheduleModel {
  readonly id: string
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

  static calculateTime(
    intervale: number = 15,
    hourStart: number = 480,
  ): number {
    return hourStart + intervale
  }

  static convertHoursMinutesToHoursString(minutesAmount: number = 0): string {
    const hours = Math.floor(minutesAmount / 60)
    const minutes = minutesAmount % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  verifyTimeExists(time: number): boolean {
    return this.timeSchedule === time
  }

  static verifyIsBeforeCurrent(time: number): boolean {
    const date = new Date()
    const minutesCurrent = date.getHours() * 60 + date.getMinutes()
    return minutesCurrent > time
  }
}
