import { isBefore, isSame } from './config/instance-day-js'
import { type VerifyDateIsCurrentOrPassed } from '@/domain/protocols/infra/date'

export class DayjsAdapter implements VerifyDateIsCurrentOrPassed {
  async isCurrent(date: string): Promise<boolean> {
    const dateInFormatIso = new Date(date).toISOString()
    return isSame(dateInFormatIso)
  }

  async isPassed(date: string): Promise<boolean> {
    const dateInFormatIso = new Date(date).toISOString()
    return isBefore(dateInFormatIso) || isSame(dateInFormatIso)
  }
}
