import { type AccountModel } from '../../../../domain/model/account-model'
import { type AddAccountModel, type AddAccountRepository } from '../../../../domain/protocols/add-account-repository'
import prisma from '../helpers/client'

export class AccountRepository implements AddAccountRepository {
  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    const account = await prisma.account.create({
      data: addAccountModel
    })
    return account as AccountModel
  }
}
