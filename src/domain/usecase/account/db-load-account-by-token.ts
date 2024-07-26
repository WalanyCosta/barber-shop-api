import { type Decryptor } from '../../protocols/infra/crypto/jwt/decrypter'
import { type LoadAccountByTokenRepository } from '../../protocols/infra/db/account/load-account-by-token-repository'
import { type LoadAccountByToken } from '../../protocols/presentation/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decryptor: Decryptor,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string): Promise<string | null> {
    let token: string | null = null
    try {
      token = await this.decryptor.decrypt(accessToken)
    } catch (error) {
      return null
    }

    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken)
      if (account) {
        return account.id
      }
    }

    return await Promise.resolve(null)
  }
}
