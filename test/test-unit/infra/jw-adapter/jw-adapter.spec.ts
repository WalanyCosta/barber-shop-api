import { JwtAdapter } from './../../../../src/infra/jw-adapter/jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve('any_token')
  }
}))

describe('JWT Adapter', () => {
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
    jest.spyOn(jwt, 'sign').mockImplementation(() => { throw new Error() })
    const error = sut.encrypt('any_id')
    await expect(error).rejects.toThrow()
  })
})
