import { type AddAccount, type AddAccountParam, type Authentication, type AuthenticationParam } from '@/domain/protocols/presentation'

export const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (param: AuthenticationParam): Promise<string> {
      return 'any_token'
    }
  }

  return new AuthenticationStub()
}

export const makeAddAccountRepositoryStub = (): AddAccount => {
  class AddAccountRepositoryStub implements AddAccount {
    async add (addAccountParam: AddAccountParam): Promise<string | null> {
      return await Promise.resolve('any_token')
    }
  }

  return new AddAccountRepositoryStub()
}
