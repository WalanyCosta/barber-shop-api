import { type Decryptor } from '../../../../src/domain/protocols/infra/crypto/decrypter'
import { DbLoadAccountByToken } from './../../../../src/domain/usecase/db-load-account-by-token'

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
    const decryptorStub = makeDecryptor()
    const sut = new DbLoadAccountByToken(decryptorStub)
    const decryptSpy = jest.spyOn(decryptorStub, 'decrypt')
    const accessToken = 'any_token'
    await sut.load(accessToken)
    expect(decryptSpy).toHaveBeenCalledWith(accessToken)
  })
})
