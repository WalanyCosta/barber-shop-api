import dayjs from 'dayjs'

export function isBefore(date: string): boolean {
  return dayjs().isBefore(date, 'date')
}

export function isSame(date: string): boolean {
  return dayjs().isSame(date, 'date')
}
