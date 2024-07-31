import { type AccountModel } from '@/domain/model/account-model'
import {
  type AddAccount,
  type AddAccountParam,
  type Authentication,
  type AuthenticationParam,
  type LoadAccountByIdOrEmail,
} from '@/domain/protocols/presentation'
import { mockAccountModel } from '../../helper/mock-account-model'

export const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth(param: AuthenticationParam): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

export const makeAddAccountRepositoryStub = (): AddAccount => {
  class AddAccountRepositoryStub implements AddAccount {
    async add(addAccountParam: AddAccountParam): Promise<string | null> {
      return await Promise.resolve('any_token')
    }
  }

  return new AddAccountRepositoryStub()
}

export const makeLoadAccountByIdOrEmailStub = (): LoadAccountByIdOrEmail => {
  class LoadAccountByIdOrEmailStub implements LoadAccountByIdOrEmail {
    async loadByIdOrEmail(idOrEmail: string): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel)
    }
  }
  return new LoadAccountByIdOrEmailStub()
}
