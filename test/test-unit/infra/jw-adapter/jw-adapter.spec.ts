import { JwtAdapter } from './../../../../src/infra/jw-adapter/jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'any_token'
  },
  verify (): string {
    return ''
  }
}))

describe('JWT Adapter encrypter', () => {
  test('should call sign with correct param', async () => {
    const privatekey = 'secret'
    const sut = new JwtAdapter(privatekey)
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, privatekey)
  })

  test('should throw if sign throws', async () => {
    const privatekey = 'secret'
    const sut = new JwtAdapter(privatekey)
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const error = sut.encrypt('any_id')
    await expect(error).rejects.toThrow()
  })

  test('should return accessToken on success', async () => {
    const privatekey = 'secret'
    const sut = new JwtAdapter(privatekey)
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })
})

describe('JWT Adapter decrypter', () => {
  test('should call verify with correct params', async () => {
    const privatekey = 'secret'
    const sut = new JwtAdapter(privatekey)
    const signSpy = jest.spyOn(jwt, 'verify')
    await sut.decrypt('token')
    expect(signSpy).toHaveBeenCalledWith('token', privatekey)
  })
})
