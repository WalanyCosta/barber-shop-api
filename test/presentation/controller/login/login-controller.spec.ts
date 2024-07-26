import { LoginController } from '@/presentation/controller'
import { type Validator } from '@/presentation/protocols/validator'
import { type Authentication } from '@/domain/protocols/presentation'
import { UnauthorizedError } from '@/presentation/errors/unauthorized-error'
import { makeAuthentication, makeValidatorStub } from '../../mocks'

interface SutTypes {
  sut: LoginController
  validatorStub: Validator
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validatorStub = makeValidatorStub()
  const sut = new LoginController(validatorStub, authenticationStub)

  return {
    sut,
    validatorStub,
    authenticationStub
  }
}

const mockLoginParam = {
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

describe('Login Controller', () => {
  test('should call validate with correct params', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(mockLoginParam)
    expect(validateSpy).toHaveBeenCalledWith(mockLoginParam.body)
  })

  test('should return 400 if validate throws error', async () => {
    const { sut, validatorStub } = makeSut()
    const error = new Error()
    jest.spyOn(validatorStub, 'validate').mockReturnValue(error)
    const httpResponse = await sut.handle(mockLoginParam)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: error
    })
  })

  test('should call Authentication with correct params', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockLoginParam)
    expect(authSpy).toHaveBeenCalledWith(mockLoginParam.body)
  })

  test('should return 401 if auth email is not exists', async () => {
    const { sut, authenticationStub } = makeSut()
    const error = new UnauthorizedError('User not exists')
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockLoginParam)
    expect(httpResponse).toEqual({
      statusCode: 401,
      body: error
    })
  })

  test('should return 401 if auth password is invalid', async () => {
    const { sut, authenticationStub } = makeSut()
    const error = new UnauthorizedError('Invalid password')
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockLoginParam)
    expect(httpResponse).toEqual({
      statusCode: 401,
      body: error
    })
  })

  test('should return 500 if auth throws error', async () => {
    const { sut, authenticationStub } = makeSut()
    const error = new Error()
    jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockLoginParam)
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: error
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockLoginParam)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: 'any_token'
    })
  })
})
