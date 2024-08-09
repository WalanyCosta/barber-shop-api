import { type VerifyDateIsPassed } from '@/domain/protocols/infra/date/verify-date-is-passed'
import { isBefore, isSame } from './config/instance-day-js'
import { type VerifyDateIsCurrent } from '@/domain/protocols/infra/date'

export class DayjsAdapter implements VerifyDateIsPassed, VerifyDateIsCurrent {
  async isCurrent(date: string): Promise<boolean> {
    return isSame(date)
  }

  async isPassed(date: string): Promise<boolean> {
    return isBefore(date)
  }
}
