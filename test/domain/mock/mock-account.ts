import { type AccountModel } from '@/domain/model/account-model'
import {
  type LoadAccountByTokenRepository,
  type AddAccountModel,
  type AddAccountRepository,
  type LoadAccountByIdOrEmailRepository,
  type UpdateAccessTokenGenerator,
} from '@/domain/protocols/infra/db'
import { type Encrypter } from '@/domain/protocols/infra/crypto'
import { mockAccountModel } from '../../helper/mock-account-model'

export const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(addAccountModel: AddAccountModel): Promise<AccountModel> {
      return mockAccountModel
    }
  }

  return new AddAccountRepositoryStub()
}

export const makeUpdateAccessTokenGeneratorStub =
  (): UpdateAccessTokenGenerator => {
    class UpdateAccessTokenGeneratorStub implements UpdateAccessTokenGenerator {
      async updateAccessToken(id: string, accessToken: string): Promise<void> {
        Promise.resolve()
      }
    }

    return new UpdateAccessTokenGeneratorStub()
  }

export const makeLoadAccountByIdOrEmailRepositoryStub = (
  result: any = null,
): LoadAccountByIdOrEmailRepository => {
  class LoadAccountByIdOrEmailRepositoryStub
    implements LoadAccountByIdOrEmailRepository
  {
    async load(email: string): Promise<AccountModel | null> {
      return await Promise.resolve(result)
    }
  }

  return new LoadAccountByIdOrEmailRepositoryStub()
}

export const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}

export const makeLoadAccountByTokenRepository =
  (): LoadAccountByTokenRepository => {
    class LoadAccountByTokenRepositoryStub
      implements LoadAccountByTokenRepository
    {
      async loadByToken(account: string): Promise<AccountModel> {
        return await Promise.resolve(mockAccountModel)
      }
    }
    return new LoadAccountByTokenRepositoryStub()
  }
