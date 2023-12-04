import { type AddAccountParam, type AddAccountRepository } from '../protocols/add-account'
import { type LoadAccountByEmailRepository } from '../protocols/load-account-by-email-repository'

export class DbAddAccount implements AddAccountRepository {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}

  async add (addAccountParam: AddAccountParam): Promise<string | null> {
    const response = await this.loadAccountByEmailRepository.load(addAccountParam.email)
    if (!response) return 'any_token'
    return null
  }
}
