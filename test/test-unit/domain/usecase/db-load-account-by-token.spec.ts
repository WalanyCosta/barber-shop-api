import { type AccountModel } from './../../../../src/domain/model/account-model'
import { type Decryptor } from '../../../../src/domain/protocols/infra/crypto/decrypter'
import { DbLoadAccountByToken } from './../../../../src/domain/usecase/db-load-account-by-token'
import { type LoadAccountByTokenRepository } from '../../../../src/domain/protocols/infra/db/load-account-by-token-repository'

interface SutTypes {
  sut: DbLoadAccountByToken
  decryptorStub: Decryptor
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const decryptorStub = makeDecryptor()
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decryptorStub, loadAccountByTokenRepositoryStub)

  return {
    sut,
    decryptorStub,
    loadAccountByTokenRepositoryStub
  }
}

const makeDecryptor = (): Decryptor => {
  class DecryptorStub implements Decryptor {
    async decrypt (token: string): Promise<string> {
      return 'any_id'
    }
  }

  return new DecryptorStub()
}

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (account: string): Promise<AccountModel> {
      return await Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        avatar: 'default_avatar',
        phone: 'any_phone_number',
        accessToken: 'any_token'
      })
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

describe('DbLoadAccountByToken', () => {
  test('should call decrypter with correct params', async () => {
    const { sut, decryptorStub } = makeSut()
    const decryptSpy = jest.spyOn(decryptorStub, 'decrypt')
    const accessToken = 'any_token'
    await sut.load(accessToken)
    expect(decryptSpy).toHaveBeenCalledWith(accessToken)
  })

  test('should return null if decrypter throws', async () => {
    const { sut, decryptorStub } = makeSut()
    jest.spyOn(decryptorStub, 'decrypt').mockRejectedValueOnce(new Error())
    const accessToken = 'wrong_token'
    const response = await sut.load(accessToken)
    expect(response).toBeNull()
  })

  test('should call LoadAccountByTokenRepository with correct params', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const decryptSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    const accessToken = 'any_token'
    await sut.load(accessToken)
    expect(decryptSpy).toHaveBeenCalledWith(accessToken)
  })

  test('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockResolvedValueOnce(null)
    const accessToken = 'any_token'
    const account = await sut.load(accessToken)
    expect(account).toBeNull()
  })
})
