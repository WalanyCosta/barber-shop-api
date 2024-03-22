import { type Decryptor } from '@/domain/protocols/infra/crypto/decrypter'
import { type Encrypter } from '@/domain/protocols/infra/crypto/encrypter'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decryptor {
  constructor (private readonly privatekey: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = async (): Promise<string> => jwt.sign({ id: value }, this.privatekey)
    return await accessToken()
  }

  async decrypt (token: string): Promise<string> {
    const value = async (): Promise<string | any> => jwt.verify(token, this.privatekey)
    return await value()
  }
}
