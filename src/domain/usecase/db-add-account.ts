import { type AddAccountParam, type AddAccount } from '../protocols/add-account'
import { type AddAccountRepository } from '../protocols/add-account-repository'
import { type Hasher } from '../protocols/hasher'
import { type LoadAccountByEmailRepository } from '../protocols/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add (addAccountParam: AddAccountParam): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(addAccountParam.email)
    if (!account) {
      const hashed = await this.hasher.hash(addAccountParam.password)
      await this.addAccountRepository.add({
        ...addAccountParam,
        password: hashed
      })
      return 'any_token'
    }
    return null
  }
}
