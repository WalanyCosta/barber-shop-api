import { BcryptAdapter } from '@/infra/libs/bcrypt/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('any_hash')
  },
  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
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

  test('should return a valid hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('any_hash')
  })

  test('should call compare with correct value', async () => {
    const sut = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'hashed')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'hashed')
  })

  test('should throw if compare throws', async () => {
    const sut = makeSut()
    const mockedCompare = bcrypt.compare as jest.Mock<any, any>
    mockedCompare.mockRejectedValueOnce(new Error())
    const error = sut.compare('any_value', 'hashed')
    await expect(error).rejects.toThrow()
  })

  test('should return true compare on success', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'hashed')
    expect(isValid).toBeTruthy()
  })

  test('should return false compare if values are different', async () => {
    const sut = makeSut()
    const mockedCompare = bcrypt.compare as jest.Mock<any, any>
    mockedCompare.mockResolvedValueOnce(false)
    const isValid = await sut.compare('any_value', 'hashed')
    expect(isValid).toBeFalsy()
  })
})
