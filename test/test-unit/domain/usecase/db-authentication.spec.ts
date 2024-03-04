import { UnauthorizedError } from './../../../../src/presentation/errors/unauthorized-error'
import { DbAuthentication } from './../../../../src/domain/usecase/db-authentication'
import { type AccountModel } from '../../../../src/domain/model/account-model'
import { type LoadAccountByEmailRepository } from '../../../../src/domain/protocols/infra/db/load-account-by-email-repository'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

const fakeRequestAccount = {
  email: 'any_email',
  password: 'any_password'
}

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
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(fakeRequestAccount)
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('should throw if loadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(null)
    const error = sut.auth(fakeRequestAccount)
    await expect(error).rejects.toThrow(new UnauthorizedError('user not exists'))
  })

  test('should throw if loadAccountByEmailRepository throws error', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const error = new UnauthorizedError('user not exists')
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(error)
    const promise = sut.auth(fakeRequestAccount)
    await expect(promise).rejects.toThrow(error)
  })
})
