import { type AccountModel } from '@/domain/model/account-model'
import { type LoadAccountByIdOrEmailRepository } from '@/domain/protocols/infra/db'
import { type LoadAccountByIdOrEmail } from '@/domain/protocols/presentation/account/load-account-by-id'
import { NotExistsRegister } from '@/presentation/errors'

export class DbLoadAccountByIdOrEmail implements LoadAccountByIdOrEmail {
  constructor (private readonly loadAccountByIdOrEmailRepository: LoadAccountByIdOrEmailRepository) {}
  async loadByIdOrEmail (idOrEmail: string): Promise<AccountModel | null> {
    const account = await this.loadAccountByIdOrEmailRepository.load(idOrEmail)

    if (!account) {
      throw new NotExistsRegister('This services not exists')
    }

    return Object.assign(account, { password: null })
  }
}
