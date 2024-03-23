import { type HashComparer } from '@/domain/protocols/infra/crypto/bcrypt/hash-comparer'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'
import { DbAuthentication } from '@/domain/usecase/db-authentication'
import { type AccountModel } from '@/domain/model/account-model'
import { type LoadAccountByEmailRepository } from '@/domain/protocols/infra/db/account/load-account-by-email-repository'
import { type Encrypter } from '@/domain/protocols/infra/crypto/jwt/encrypter'
import { type UpdateAccessTokenGenerator } from '@/domain/protocols/infra/db/account/update-access-token-generator'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenGeneratorStub: UpdateAccessTokenGenerator
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const hashComparerStub = makeHashCompare()
  const updateAccessTokenGeneratorStub = makeUpdateAccessTokenGeneratorStub()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenGeneratorStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenGeneratorStub
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

const makeUpdateAccessTokenGeneratorStub = (): UpdateAccessTokenGenerator => {
  class UpdateAccessTokenGeneratorStub implements UpdateAccessTokenGenerator {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {
      Promise.resolve()
    }
  }

  return new UpdateAccessTokenGeneratorStub()
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

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    const error = new Error()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(error)
    const promise = sut.auth(fakeRequestAccount)
    await expect(promise).rejects.toThrow(error)
  })

  test('should call UpdateAccessTokenGenerator with correct params', async () => {
    const { sut, updateAccessTokenGeneratorStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(updateAccessTokenGeneratorStub, 'updateAccessToken')
    await sut.auth(fakeRequestAccount)
    expect(updateAccessTokenSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('should throw if UpdateAccessTokenGenerator throws', async () => {
    const { sut, updateAccessTokenGeneratorStub } = makeSut()
    const error = new Error()
    jest.spyOn(updateAccessTokenGeneratorStub, 'updateAccessToken').mockRejectedValueOnce(error)
    const promise = sut.auth(fakeRequestAccount)
    await expect(promise).rejects.toThrow(error)
  })

  test('should return accessToken on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(fakeRequestAccount)
    expect(accessToken).toBe('any_token')
  })
})
