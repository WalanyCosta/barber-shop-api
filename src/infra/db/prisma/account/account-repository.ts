import { type LoadAccountByEmailRepository } from './../../../../domain/protocols/load-account-by-email-repository'
import { type AccountModel } from '../../../../domain/model/account-model'
import { type AddAccountModel, type AddAccountRepository } from '../../../../domain/protocols/add-account-repository'
import prisma from '../helpers/client'

export class AccountRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    const account = await prisma.account.create({
      data: addAccountModel
    })
    return account as AccountModel
  }

  async load (email: string): Promise<AccountModel | null> {
    const account = await prisma.account.findFirst({
      where: {
        email
      }
    })
    return account as AccountModel
  }
}
