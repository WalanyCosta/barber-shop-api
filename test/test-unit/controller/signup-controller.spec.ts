import { ValidationError } from '../../../src/presentation/errors/validation-error'
import { SignUpController } from './../../../src/presentation/controller/signup/signup-controller'

describe('SignUp Controller', () => {
  test('should return status 400 if name is required', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new ValidationError('name is required. Please write name')
    })
  })

  test('should return status 400 if name is empty', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: '',
        email: 'any_email@mail.com',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new ValidationError('name is empty. Please write name')
    })
  })

  test('should return status 400 if email is required', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new ValidationError('email is required. Please write email')
    })
  })

  test('should return status 400 if email is empty', async () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: '',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new ValidationError('email is empty. Please write email')
    })
  })
})
