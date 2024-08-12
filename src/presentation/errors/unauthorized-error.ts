export class UnauthorizedError extends Error {
  constructor(message: string) {
    super('Unauthorized Error')
    this.message = message
  }
}
