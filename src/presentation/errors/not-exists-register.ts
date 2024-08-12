export class NotExistsRegister extends Error {
  constructor(mensagem: string) {
    super(mensagem)
    this.name = 'NotExistsRegister'
  }
}
