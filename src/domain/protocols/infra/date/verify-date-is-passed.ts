export interface VerifyDateIsPassed {
  isPassed: (date: string) => Promise<boolean>
}
