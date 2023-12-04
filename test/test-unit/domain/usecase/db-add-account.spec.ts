import { DbAddAccount } from './../../../../src/domain/usecase/db-add-account'
import { type LoadAccountByEmailRepository } from './../../../../src/domain/protocols/load-account-by-email-repository'
import { type AccountModel } from './../../../../src/domain/model/account-model'

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel | null> {
      return await Promise.resolve(null)
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const fakeResponseAccount: AccountModel = (
  {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    phone: 'any_phone',
    avatar: 'any_avatar',
    accessToken: 'any_token'
  }
)

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

  test('should return null if loadAccountByEmailRepository returns account', async () => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
    const sut = new DbAddAccount(loadAccountByEmailRepositoryStub)
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(fakeResponseAccount)
    const response = await sut.add({
      name: 'any_token',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone'
    })
    expect(response).toBeNull()
  })

  test('should return throw if loadAccountByEmailRepository throws', async () => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
    const sut = new DbAddAccount(loadAccountByEmailRepositoryStub)
    const error = new Error()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(error)
    const response = sut.add({
      name: 'any_token',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone'
    })
    expect(response).rejects.toThrow(error)
  })
})
