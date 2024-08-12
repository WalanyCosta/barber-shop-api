import { UnauthorizedError } from '../../../presentation/errors/unauthorized-error'
import { type Encrypter } from '../../protocols/infra/crypto/jwt/encrypter'
import { type HashComparer } from '../../protocols/infra/crypto/bcrypt/hash-comparer'
import { type LoadAccountByIdOrEmailRepository } from '../../protocols/infra/db/account/load-account-by-id-or-email-repository'
import { type UpdateAccessTokenGenerator } from '../../protocols/infra/db/account/update-access-token-generator'
import {
  type Authentication,
  type AuthenticationParam,
} from '../../protocols/presentation/account/authentication'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByIdOrEmailRepository: LoadAccountByIdOrEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenGenerator: UpdateAccessTokenGenerator,
  ) {}

  async auth(param: AuthenticationParam): Promise<string | null> {
    const account = await this.loadAccountByIdOrEmailRepository.load(
      param.email,
    )
    if (!account) {
      throw new UnauthorizedError('user not exists')
    }

    const isValid = await this.hashComparer.compare(
      param.password,
      account.password,
    )

    if (!isValid) {
      throw new UnauthorizedError('password is invalid')
    }

    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenGenerator.updateAccessToken(
      account.id,
      accessToken,
    )
    return accessToken
  }
}
