import { type VerifyDateIsPassed } from './verify-date-is-passed'
import { type VerifyDateIsCurrent } from './verify-date-is-current'

export interface VerifyDateIsCurrentOrPassed
  extends VerifyDateIsCurrent,
    VerifyDateIsPassed {}
