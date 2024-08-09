import { type VerifyDateIsPassed } from '@/domain/protocols/infra/date/verify-date-is-passed'
import { isBefore } from './config/instance-day-js'

export class DayjsAdapter implements VerifyDateIsPassed {
  async isPassed(date: string): Promise<boolean> {
    return isBefore(date)
  }
}
