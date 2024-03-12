import { AuthMiddleware } from './../../../../src/presentation/middleware/auth-middleware'
import { type LoadAccountByToken } from './../../../../src/domain/protocols/presentation/load-account-by-token'

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<string> {
      return 'any_id'
    }
  }

  return new LoadAccountByTokenStub()
}

describe('Auth Middleware', () => {
  test('should call LoadAccountByToken with correct param', async () => {
    const loadAccountByTokenStub = makeLoadAccountByToken()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const httpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
