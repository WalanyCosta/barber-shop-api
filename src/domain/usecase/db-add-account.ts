import { type AddAccountParam, type AddAccount } from '../protocols/add-account'
import { type Hasher } from '../protocols/hasher'
import { type LoadAccountByEmailRepository } from '../protocols/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher) {}

  async add (addAccountParam: AddAccountParam): Promise<string | null> {
    const response = await this.loadAccountByEmailRepository.load(addAccountParam.email)
    if (!response) {
      await this.hasher.hash(addAccountParam.password)
      return 'any_token'
    }
    return null
  }
}
