import { JwtAdapter } from '@/infra/libs/jw-adapter/jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  },
  verify (): string {
    return 'any_value'
  }
}))

const makeSut = (privateKey = 'secret'): JwtAdapter => {
  return new JwtAdapter(privateKey)
}

describe('JWT Adapter encrypter', () => {
  test('should call sign with correct param', async () => {
    const privatekey = 'secret'
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, privatekey)
  })

  test('should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const error = sut.encrypt('any_id')
    await expect(error).rejects.toThrow()
  })

  test('should return accessToken on success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })
})

describe('JWT Adapter Decryptor', () => {
  test('should call verify with correct params', async () => {
    const privatekey = 'secret'
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'verify')
    await sut.decrypt('token')
    expect(signSpy).toHaveBeenCalledWith('token', privatekey)
  })

  test('should throw if verify throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error() })
    const error = sut.decrypt('token')
    await expect(error).rejects.toThrow()
  })

  test('should return value on success', async () => {
    const sut = makeSut()
    const value = await sut.decrypt('token')
    expect(value).toBe('any_value')
  })
})
