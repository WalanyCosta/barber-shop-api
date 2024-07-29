import {
  type Hasher,
  type Encrypter
} from '@/domain/protocols/infra/crypto'
import {
  type UpdateAccessTokenGenerator,
  type LoadAccountByIdOrEmailRepository,
  type AddAccountRepository
} from '@/domain/protocols/infra/db'
import {
  type AddAccountParam,
  type AddAccount
} from '@/domain/protocols/presentation/account/add-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly loadAccountByIdOrEmailRepository: LoadAccountByIdOrEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenGenerator: UpdateAccessTokenGenerator
  ) {}

  async add (addAccountParam: AddAccountParam): Promise<string | null> {
    const account = await this.loadAccountByIdOrEmailRepository.load(addAccountParam.email)
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
