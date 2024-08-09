import dayjs from 'dayjs'

export function isBefore(date: string): boolean {
  return dayjs().isAfter(date, 'date')
}
