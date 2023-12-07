import { BcryptAdapter } from './../../../../src/infra/bcrypt/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hash')
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call hash with correct value', async () => {
    const saltRounds = 10
    const sut = new BcryptAdapter(saltRounds)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', saltRounds)
  })

  test('should throw if hash throws', async () => {
    const saltRounds = 10
    const sut = new BcryptAdapter(saltRounds)
    const mockedHash = bcrypt.hash as jest.Mock<any, any>
    mockedHash.mockRejectedValueOnce(new Error())
    const error = sut.hash('any_value')
    await expect(error).rejects.toThrow()
  })
})