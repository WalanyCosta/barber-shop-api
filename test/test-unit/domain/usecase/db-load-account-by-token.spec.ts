import { type Decryptor } from '../../../../src/domain/protocols/infra/crypto/decrypter'
import { DbLoadAccountByToken } from './../../../../src/domain/usecase/db-load-account-by-token'

interface SutTypes {
  sut: DbLoadAccountByToken
  decryptorStub: Decryptor
}

const makeSut = (): SutTypes => {
  const decryptorStub = makeDecryptor()
  const sut = new DbLoadAccountByToken(decryptorStub)

  return {
    sut,
    decryptorStub
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
})
