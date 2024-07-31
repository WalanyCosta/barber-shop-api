import {
  type UpdateAccessTokenGenerator,
  type LoadAccountByIdOrEmailRepository,
  type AddAccountRepository,
} from '@/domain/protocols/infra/db'
import { type Encrypter, type Hasher } from '@/domain/protocols/infra/crypto'
import { DbAddAccount } from '@/domain/usecase/account/db-add-account'
import {
  makeAddAccountRepositoryStub,
  makeEncrypterStub,
  makeUpdateAccessTokenGeneratorStub,
  makeLoadAccountByIdOrEmailRepositoryStub,
} from '../../mock/mock-account'
import {
  mockAccountModel,
  mockAddAccountParams,
} from '../../../helper/mock-account-model'

interface SutTypes {
  sut: DbAddAccount
  loadAccountByIdOrEmailRepositoryStub: LoadAccountByIdOrEmailRepository
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  encrypterStub: Encrypter
  updateAccessTokenGeneratorStub: UpdateAccessTokenGenerator
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasherStub()
  const encrypterStub = makeEncrypterStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const updateAccessTokenGeneratorStub = makeUpdateAccessTokenGeneratorStub()
  const loadAccountByIdOrEmailRepositoryStub =
    makeLoadAccountByIdOrEmailRepositoryStub()
  const sut = new DbAddAccount(
    loadAccountByIdOrEmailRepositoryStub,
    hasherStub,
    addAccountRepositoryStub,
    encrypterStub,
    updateAccessTokenGeneratorStub,
  )

  return {
    sut,
    loadAccountByIdOrEmailRepositoryStub,
    hasherStub,
    addAccountRepositoryStub,
    encrypterStub,
    updateAccessTokenGeneratorStub,
  }
}

export const makeHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return await Promise.resolve('any_hash')
    }
  }

  return new HasherStub()
}

describe('DbAddAccount', () => {
  test('should call loadAccountByIdOrEmailRepository with correct param', async () => {
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
    await sut.add(mockAddAccountParams)
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('should return null if loadAccountByIdOrEmailRepository returns account', async () => {
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
      .mockResolvedValueOnce(mockAccountModel)
    const response = await sut.add(mockAddAccountParams)
    expect(response).toBeNull()
  })

  test('should return throw if loadAccountByIdOrEmailRepository throws', async () => {
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    const error = new Error()
    jest
      .spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
      .mockRejectedValueOnce(error)
    const response = sut.add(mockAddAccountParams)
    expect(response).rejects.toThrow(error)
  })

  test('should call Hasher with correct param', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams)
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })

  test('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())
    const error = sut.add(mockAddAccountParams)
    await expect(error).rejects.toThrow(new Error())
  })

  test('should call AddAccountRepository with correct param', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams)
    expect(addSpy).toHaveBeenCalledWith({
      ...mockAddAccountParams,
      password: 'any_hash',
    })
  })

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest
      .spyOn(addAccountRepositoryStub, 'add')
      .mockRejectedValueOnce(new Error())
    const error = sut.add(mockAddAccountParams)
    await expect(error).rejects.toThrow(new Error())
  })

  test('should call Encrypter with correct param', async () => {
    const { sut, encrypterStub } = makeSut()
    const addSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(mockAddAccountParams)
    expect(addSpy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockRejectedValueOnce(new Error())
    const error = sut.add(mockAddAccountParams)
    await expect(error).rejects.toThrow(new Error())
  })

  test('should return token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.add(mockAddAccountParams)
    expect(accessToken).toBe('any_token')
  })

  test('should call UpdateAccessTokenGenerator with correct param', async () => {
    const { sut, updateAccessTokenGeneratorStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(
      updateAccessTokenGeneratorStub,
      'updateAccessToken',
    )
    await sut.add(mockAddAccountParams)
    expect(updateAccessTokenSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('should throw if UpdateAccessTokenGenerator throws', async () => {
    const { sut, updateAccessTokenGeneratorStub } = makeSut()
    jest
      .spyOn(updateAccessTokenGeneratorStub, 'updateAccessToken')
      .mockRejectedValueOnce(new Error())
    const error = sut.add(mockAddAccountParams)
    await expect(error).rejects.toThrow(new Error())
  })
})
