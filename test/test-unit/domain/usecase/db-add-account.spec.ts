import { DbAddAccount } from './../../../../src/domain/usecase/db-add-account'
import { type LoadAccountByEmailRepository } from './../../../../src/domain/protocols/load-account-by-email-repository'
import { type AccountModel } from './../../../../src/domain/model/account-model'

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        phone: 'any_phone',
        avatar: 'any_avatar',
        accessToken: 'any_token'
      })
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

describe('DbAddAccount', () => {
  test('should call loadAccountByEmailRepository with correct param', async () => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
    const sut = new DbAddAccount(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.add({
      name: 'any_token',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })
})
