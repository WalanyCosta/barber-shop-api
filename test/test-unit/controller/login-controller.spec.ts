import { LoginController } from './../../../src/presentation/controller/login/login-controller'
import { type Validator } from '../../../src/presentation/protocols/validator'

interface SutTypes {
  sut: LoginController
  validatorStub: Validator
}

const makeSut = (): SutTypes => {
  const validatorStub = makeValidator()
  const sut = new LoginController(validatorStub)

  return {
    sut,
    validatorStub
  }
}

const fakeHttpRequest = {
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    validate (input: any): Error | null {
      return null
    }
  }

  return new ValidatorStub()
}

describe('Login Controller', () => {
  test('should call validate with correct params', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(fakeHttpRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeHttpRequest.body)
  })

  test('should return 400 if validate throws error', async () => {
    const { sut, validatorStub } = makeSut()
    const error = new Error()
    jest.spyOn(validatorStub, 'validate').mockReturnValue(error)
    const fakeHttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(fakeHttpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: error
    })
  })
})
