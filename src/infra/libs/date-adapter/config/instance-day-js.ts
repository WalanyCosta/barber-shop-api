import dayjs from 'dayjs'

export function isBefore(date: string): boolean {
  return dayjs().isBefore(date)
}
