import { type LoadAccountByEmailRepository } from '../protocols/infra/db/load-account-by-email-repository'
import { type Authentication, type AuthenticationParam } from '../protocols/presentation/authentication'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}
  async auth (param: AuthenticationParam): Promise<string | null> {
    this.loadAccountByEmailRepository.load(param.email)
    return await Promise.resolve('any')
  }
}
