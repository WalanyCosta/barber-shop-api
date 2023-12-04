import { DbAddAccount } from './../../../../src/domain/usecase/db-add-account'
import { type LoadAccountByEmailRepository } from './../../../../src/domain/protocols/load-account-by-email-repository'
import { type AccountModel } from './../../../../src/domain/model/account-model'

interface SutTypes {
  sut: DbAddAccount
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAddAccount(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

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

const fakeRequestAccount = (
  {
    name: 'any_token',
    email: 'any_email',
    password: 'any_password',
    phone: 'any_phone'
  }
)

describe('DbAddAccount', () => {
  test('should call loadAccountByEmailRepository with correct param', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.add(fakeRequestAccount)
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('should return null if loadAccountByEmailRepository returns account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(fakeResponseAccount)
    const response = await sut.add(fakeRequestAccount)
    expect(response).toBeNull()
  })

  test('should return throw if loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(error)
    const response = sut.add(fakeRequestAccount)
    expect(response).rejects.toThrow(error)
  })
})
