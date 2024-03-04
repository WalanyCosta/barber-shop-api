import { type HashComparer } from './../../../../src/domain/protocols/infra/crypto/hash-comparer'
import { UnauthorizedError } from './../../../../src/presentation/errors/unauthorized-error'
import { DbAuthentication } from './../../../../src/domain/usecase/db-authentication'
import { type AccountModel } from '../../../../src/domain/model/account-model'
import { type LoadAccountByEmailRepository } from '../../../../src/domain/protocols/infra/db/load-account-by-email-repository'
import { type Encrypter } from '../../../../src/domain/protocols/infra/crypto/encrypter'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const hashComparerStub = makeHashCompare()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub
  }
}

const fakeRequestAccount = {
  email: 'any_email',
  password: 'any_password'
}

const makeHashCompare = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => { resolve(true) })
    }
  }
  return new HashComparerStub()
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
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

  test('should call hashComparer with correct params', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareStub = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(fakeRequestAccount)
    expect(compareStub).toHaveBeenCalledWith('any_password', 'hashed')
  })

  test('should throw if hashComparer returns false to password invalid', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const promise = sut.auth(fakeRequestAccount)
    await expect(promise).rejects.toThrow(new UnauthorizedError('password is invalid'))
  })

  test('should throw if hashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    const error = new Error()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(error)
    const promise = sut.auth(fakeRequestAccount)
    await expect(promise).rejects.toThrow(error)
  })

  test('should call Encrypter with correct param', async () => {
    const { sut, encrypterStub } = makeSut()
    const addSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(fakeRequestAccount)
    expect(addSpy).toHaveBeenCalledWith('any_id')
  })
})
