import { type AccountModel } from '@/domain/model/account-model'
import { type LoadAccountByIdOrEmailRepository } from '@/domain/protocols/infra'
import { type LoadAccountByIdOrEmail } from '@/domain/protocols/presentation/load-account-by-id'

export class DbLoadAccountByIdOrEmail implements LoadAccountByIdOrEmail {
  constructor (private readonly loadAccountByIdOrEmailRepository: LoadAccountByIdOrEmailRepository) {}
  async loadByIdOrEmail (idOrEmail: string): Promise<AccountModel | null> {
    await this.loadAccountByIdOrEmailRepository.load(idOrEmail)
    return await Promise.resolve(null)
  }
}
