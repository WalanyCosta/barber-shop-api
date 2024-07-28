import { type AccountModel } from '@/domain/model/account-model'
import {
  type AddAccountModel,
  type AddAccountRepository,
  type Encrypter,
  type LoadAccountByIdOrEmailRepository,
  type UpdateAccessTokenGenerator
} from '@/domain/protocols/infra'

export const mockAccountModel: AccountModel = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed',
  phone: 'any_phone',
  accessToken: 'any_value'
}

export const mockAddAccountParams = {
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  phone: 'any_phone'
}

export const mockAuthenticationParams = {
  email: 'any_email',
  password: 'any_password'
}

export const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
      return mockAccountModel
    }
  }

  return new AddAccountRepositoryStub()
}

export const makeUpdateAccessTokenGeneratorStub = (): UpdateAccessTokenGenerator => {
  class UpdateAccessTokenGeneratorStub implements UpdateAccessTokenGenerator {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {
      Promise.resolve()
    }
  }

  return new UpdateAccessTokenGeneratorStub()
}

export const makeLoadAccountByIdOrEmailRepositoryStub = (result: any = null): LoadAccountByIdOrEmailRepository => {
  class LoadAccountByIdOrEmailRepositoryStub implements LoadAccountByIdOrEmailRepository {
    async load (email: string): Promise<AccountModel | null> {
      return await Promise.resolve(result)
    }
  }

  return new LoadAccountByIdOrEmailRepositoryStub()
}

export const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}
