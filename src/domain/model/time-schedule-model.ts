import { type ScheduleModel } from './schedule-model'

export class TimeScheduleModel {
  private readonly id: string
  private readonly dateSchedule: string
  private readonly timeSchedule: number
  private readonly scheduleId: string
  private readonly schedule?: ScheduleModel

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

  static calculateTime(intervale: number, hourStart: number): number {
    return hourStart + intervale
  }

  static convertHoursMinutesToHoursString(minutesAmount: number = 0): string {
    const hours = Math.floor(minutesAmount / 60)
    const minutes = minutesAmount % 60

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  }

  verifyIfTimeExists(time: number): boolean {
    return this.timeSchedule === time
  }
}
