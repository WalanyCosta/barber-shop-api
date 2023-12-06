import { type UpdateAccessTokenGenerator } from './../protocols/update-access-token-generator'
import { type AddAccountParam, type AddAccount } from '../protocols/add-account'
import { type AddAccountRepository } from '../protocols/add-account-repository'
import { type Encrypter } from '../protocols/encrypter'
import { type Hasher } from '../protocols/hasher'
import { type LoadAccountByEmailRepository } from '../protocols/load-account-by-email-repository'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenGenerator: UpdateAccessTokenGenerator
  ) {}

  async add (addAccountParam: AddAccountParam): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(addAccountParam.email)
    if (!account) {
      const hashed = await this.hasher.hash(addAccountParam.password)
      const newAccount = await this.addAccountRepository.add({
        ...addAccountParam,
        password: hashed
      })

      const accessToken = await this.encrypter.encrypt(newAccount.id)
      await this.updateAccessTokenGenerator.updateAccessToken(
        newAccount.id,
        accessToken
      )
      return accessToken
    }
    return null
  }
}
