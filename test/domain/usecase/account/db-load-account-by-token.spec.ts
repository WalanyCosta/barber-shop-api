import { type Decryptor } from '@/domain/protocols/infra/crypto/jwt/decrypter'
import { DbLoadAccountByToken } from '@/domain/usecase/account/db-load-account-by-token'
import { type LoadAccountByTokenRepository } from '@/domain/protocols/infra/db'
import { makeLoadAccountByTokenRepository } from '../../mock/mock-account'

interface SutTypes {
  sut: DbLoadAccountByToken
  decryptorStub: Decryptor
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decryptorStub = makeDecryptor()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(
    decryptorStub,
    loadAccountByTokenRepositoryStub,
  )

  return {
    sut,
    decryptorStub,
    loadAccountByTokenRepositoryStub,
  }
}

const makeDecryptor = (): Decryptor => {
  class DecryptorStub implements Decryptor {
    async decrypt(token: string): Promise<string> {
      return 'any_id'
    }
  }

  return new DecryptorStub()
}

describe('DbLoadAccountByToken', () => {
  test('should call decrypter with correct params', async () => {
    const { sut, decryptorStub } = makeSut()
    const accessToken = 'any_token'
    const decryptSpy = jest.spyOn(decryptorStub, 'decrypt')
    await sut.load(accessToken)
    expect(decryptSpy).toHaveBeenCalledWith(accessToken)
  })

  test('should return null if decrypter throws', async () => {
    const { sut, decryptorStub } = makeSut()
    jest.spyOn(decryptorStub, 'decrypt').mockRejectedValueOnce(new Error())
    const response = await sut.load('wrong_token')
    expect(response).toBeNull()
  })

  test('should call LoadAccountByTokenRepository with correct params', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const accessToken = 'any_token'
    const decryptSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      'loadByToken',
    )
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith(accessToken)
  })

  test('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockResolvedValueOnce(null)
    const account = await sut.load('any_token')
    expect(account).toBeNull()
  })

  test('should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const error = new Error()
    jest
      .spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
      .mockRejectedValueOnce(error)
    const response = sut.load('any_token')
    await expect(response).rejects.toThrow(error)
  })

  test('should return accountId on success', async () => {
    const { sut } = makeSut()
    const accountId = await sut.load('any_token')
    expect(accountId).toBe('any_id')
  })
})
