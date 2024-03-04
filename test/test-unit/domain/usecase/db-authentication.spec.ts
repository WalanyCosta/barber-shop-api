import { DbAuthentication } from './../../../../src/domain/usecase/db-authentication'
import { type AccountModel } from '../../../../src/domain/model/account-model'
import { type LoadAccountByEmailRepository } from '../../../../src/domain/protocols/infra/db/load-account-by-email-repository'

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel | null> {
      return await Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'hashed',
        phone: 'any_phone',
        avatar: 'any_avatar',
        accessToken: 'any_token'
      })
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

describe('DbAuthentication', () => {
  test('should call loadAccountByEmailRepository with correct param', async () => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const fakeRequestAccount = {
      email: 'any_email',
      password: 'any_password'
    }
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(fakeRequestAccount)
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })
})
