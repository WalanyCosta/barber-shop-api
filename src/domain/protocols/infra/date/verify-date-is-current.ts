export interface VerifyDateIsCurrent {
  isCurrent: (date: string) => Promise<boolean>
}
