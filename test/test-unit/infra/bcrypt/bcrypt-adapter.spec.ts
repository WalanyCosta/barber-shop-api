import { BcryptAdapter } from './../../../../src/infra/bcrypt/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  }
}))

const makeSut = (salt = 10): BcryptAdapter => {
  const sut = new BcryptAdapter(salt)
  return sut
}

describe('Bcrypt Adapter', () => {
  test('should call hash with correct value', async () => {
    const saltRounds = 10
    const sut = makeSut(saltRounds)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', saltRounds)
  })

  test('should throw if hash throws', async () => {
    const sut = makeSut()
    const mockedHash = bcrypt.hash as jest.Mock<any, any>
    mockedHash.mockRejectedValueOnce(new Error())
    const error = sut.hash('any_value')
    await expect(error).rejects.toThrow()
  })
})
