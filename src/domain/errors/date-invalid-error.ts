export class DateInvalidError extends Error {
  constructor(mensagem: string) {
    super(mensagem)
    this.name = 'DateInvalidError'
  }
}
