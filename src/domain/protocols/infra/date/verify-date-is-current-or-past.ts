export interface VerifyDateIsCurrentOrPast {
  isCurrentOrPast: (date: string) => Promise<boolean>
}
