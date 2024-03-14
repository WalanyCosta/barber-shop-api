import { type LoadAccountByTokenRepository } from './../../../../domain/protocols/infra/db/load-account-by-token-repository'
import { type LoadAccountByEmailRepository } from '../../../../domain/protocols/infra/db/load-account-by-email-repository'
import { type AccountModel } from '../../../../domain/model/account-model'
import { type AddAccountModel, type AddAccountRepository } from '../../../../domain/protocols/infra/db/add-account-repository'
import prisma from '../helpers/client'
import { type UpdateAccessTokenGenerator } from '../../../../domain/protocols/infra/db/update-access-token-generator'

export class AccountRepository implements
    AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenGenerator, LoadAccountByTokenRepository {
  async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
    const account = await prisma.account.create({
      data: {
        ...addAccountModel,
        accessToken: ''
      }
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

  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    await prisma.account.update({
      where: {
        id
      },
      data: {
        accessToken
      }
    })
  }

  async loadByToken (accessToken: string): Promise<AccountModel | null> {
    const account = await prisma.account.findFirst({
      where: {
        accessToken
      }
    })
    return account as AccountModel
  }
}
