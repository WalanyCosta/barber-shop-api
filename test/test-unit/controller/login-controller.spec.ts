import { LoginController } from './../../../src/presentation/controller/login/login-controller'
import { type Validator } from '../../../src/presentation/protocols/validator'

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
    const validatorStub = makeValidator()
    const sut = new LoginController(validatorStub)
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    const fakeHttpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.handle(fakeHttpRequest)
    expect(validateSpy).toHaveBeenCalledWith(fakeHttpRequest.body)
  })

  test('should return 400 if validate throws error', async () => {
    const validatorStub = makeValidator()
    const sut = new LoginController(validatorStub)
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
