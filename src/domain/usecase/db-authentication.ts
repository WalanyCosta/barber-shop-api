import { UnauthorizedError } from '../../presentation/errors/unauthorized-error'
import { type HashComparer } from '../protocols/infra/crypto/hash-comparer'
import { type LoadAccountByEmailRepository } from '../protocols/infra/db/load-account-by-email-repository'
import { type Authentication, type AuthenticationParam } from '../protocols/presentation/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (param: AuthenticationParam): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(param.email)
    if (!account) {
      throw new UnauthorizedError('user not exists')
    }

    const isValid = await this.hashComparer.compare(param.password, account.password)

    if (!isValid) {
      throw new UnauthorizedError('password is invalid')
    }
    return await Promise.resolve('any_token')
  }
}
