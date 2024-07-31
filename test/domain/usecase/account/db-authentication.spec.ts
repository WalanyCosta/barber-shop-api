import {
  type HashComparer,
  type Encrypter,
} from '@/domain/protocols/infra/crypto'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'
import { DbAuthentication } from '@/domain/usecase/account/db-authentication'
import {
  makeEncrypterStub,
  makeLoadAccountByIdOrEmailRepositoryStub,
  makeUpdateAccessTokenGeneratorStub,
} from '../../mock/mock-account'
import {
  type LoadAccountByIdOrEmailRepository,
  type UpdateAccessTokenGenerator,
} from '@/domain/protocols/infra/db'
import {
  mockAccountModel,
  mockAuthenticationParams,
} from '../../../helper/mock-account-model'

interface SutTypes {
  sut: DbAuthentication
  loadAccountByIdOrEmailRepositoryStub: LoadAccountByIdOrEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenGeneratorStub: UpdateAccessTokenGenerator
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypterStub()
  const hashComparerStub = makeHashCompare()
  const updateAccessTokenGeneratorStub = makeUpdateAccessTokenGeneratorStub()
  const loadAccountByIdOrEmailRepositoryStub =
    makeLoadAccountByIdOrEmailRepositoryStub(mockAccountModel)
  const sut = new DbAuthentication(
    loadAccountByIdOrEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenGeneratorStub,
  )

  return {
    sut,
    loadAccountByIdOrEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenGeneratorStub,
  }
}

const makeHashCompare = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return await new Promise((resolve) => {
        resolve(true)
      })
    }
  }
  return new HashComparerStub()
}

describe('DbAuthentication', () => {
  test('should call loadAccountByIdOrEmailRepository with correct param', async () => {
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
    await sut.auth(mockAuthenticationParams)
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('should throw if loadAccountByIdOrEmailRepository returns null', async () => {
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
      .mockResolvedValueOnce(null)
    const error = sut.auth(mockAuthenticationParams)
    await expect(error).rejects.toThrow(
      new UnauthorizedError('user not exists'),
    )
  })

  test('should throw if loadAccountByIdOrEmailRepository throws error', async () => {
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    const error = new UnauthorizedError('user not exists')
    jest
      .spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
      .mockRejectedValueOnce(error)
    const promise = sut.auth(mockAuthenticationParams)
    await expect(promise).rejects.toThrow(error)
  })

  test('should call hashComparer with correct params', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareStub = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(mockAuthenticationParams)
    expect(compareStub).toHaveBeenCalledWith('any_password', 'hashed')
  })

  test('should throw if hashComparer returns false to password invalid', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const promise = sut.auth(mockAuthenticationParams)
    await expect(promise).rejects.toThrow(
      new UnauthorizedError('password is invalid'),
    )
  })

  test('should throw if hashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    const error = new Error()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(error)
    const promise = sut.auth(mockAuthenticationParams)
    await expect(promise).rejects.toThrow(error)
  })

  test('should call Encrypter with correct param', async () => {
    const { sut, encrypterStub } = makeSut()
    const addSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthenticationParams)
    expect(addSpy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    const error = new Error()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(error)
    const promise = sut.auth(mockAuthenticationParams)
    await expect(promise).rejects.toThrow(error)
  })

  test('should call UpdateAccessTokenGenerator with correct params', async () => {
    const { sut, updateAccessTokenGeneratorStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(
      updateAccessTokenGeneratorStub,
      'updateAccessToken',
    )
    await sut.auth(mockAuthenticationParams)
    expect(updateAccessTokenSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('should throw if UpdateAccessTokenGenerator throws', async () => {
    const { sut, updateAccessTokenGeneratorStub } = makeSut()
    const error = new Error()
    jest
      .spyOn(updateAccessTokenGeneratorStub, 'updateAccessToken')
      .mockRejectedValueOnce(error)
    const promise = sut.auth(mockAuthenticationParams)
    await expect(promise).rejects.toThrow(error)
  })

  test('should return accessToken on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockAuthenticationParams)
    expect(accessToken).toBe('any_token')
  })
})
