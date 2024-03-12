import { AccessDeniedError } from './../../../../src/presentation/errors/access-denied-error'
import { AuthMiddleware } from './../../../../src/presentation/middleware/auth-middleware'
import { type LoadAccountByToken } from './../../../../src/domain/protocols/presentation/load-account-by-token'

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

  return {
    sut,
    loadAccountByTokenStub
  }
}

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
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const httpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }
    await sut.handle(httpRequest)
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null)
    const httpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 403,
      body: new AccessDeniedError()
    })
  })

  test('should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadAccountByTokenStub, 'load').mockRejectedValueOnce(error)
    const httpRequest = {
      headers: {
        'x-access-token': 'any_token'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: error
    })
  })

  test('should return 403 if no x-access-token in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 403,
      body: new AccessDeniedError()
    })
  })
})
