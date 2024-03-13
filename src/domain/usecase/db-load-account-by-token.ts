import { type Decryptor } from '../protocols/infra/crypto/decrypter'
import { type LoadAccountByToken } from '../protocols/presentation/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly decryptor: Decryptor) {}
  async load (accessToken: string): Promise<string | null> {
    await this.decryptor.decrypt(accessToken)
    return await Promise.resolve(null)
  }
}
