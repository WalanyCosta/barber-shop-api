import { type Encrypter } from '../../domain/protocols/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly privatekey: string) {}

  async encrypt (value: string): Promise<string> {
    jwt.sign({ id: value }, this.privatekey)
    return await Promise.resolve('any_token')
  }
}
