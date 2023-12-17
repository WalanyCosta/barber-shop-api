import { ValidationError } from './../../../../src/presentation/errors/validation-error'
import { ZodValidator } from '../../../../src/infra/validator/zod-validator'
import { signupSchema } from '../../../../src/infra/validator/schema/signup-schema'

describe('ZodValidator', () => {
  test('should return error if name is required', () => {
    const sut = new ZodValidator(signupSchema)
    const error = sut.validate({})
    expect(error).toEqual(new ValidationError('name is required. Please write name'))
  })

  test('should return error if name is empty', () => {
    const sut = new ZodValidator(signupSchema)
    const error = sut.validate({ name: '' })
    expect(error).toEqual(new ValidationError('name is empty. Please write name'))
  })

  test('should return error if email is required', () => {
    const sut = new ZodValidator(signupSchema)
    const error = sut.validate({
      name: 'any_name'
    })
    expect(error).toEqual(new ValidationError('email is required. Please write email'))
  })

  test('should return error if email is empty', () => {
    const sut = new ZodValidator(signupSchema)
    const error = sut.validate({
      name: 'any_name',
      email: ''
    })
    expect(error).toEqual(new ValidationError('email is empty. Please write email'))
  })

  test('should return error if email is invalid', () => {
    const sut = new ZodValidator(signupSchema)
    const error = sut.validate({
      name: 'any_name',
      email: 'any_email'
    })
    expect(error).toEqual(new ValidationError(
      'email is invalid. Please write email correctly'))
  })

  test('should return error if password is required', () => {
    const sut = new ZodValidator(signupSchema)
    const error = sut.validate({
      name: 'any_name',
      email: 'any_email@mail.com'
    })
    expect(error).toEqual(new ValidationError('password is required. Please write password'))
  })

  test('should return error password is weak', async () => {
    const sut = new ZodValidator(signupSchema)
    const httpResponse = sut.validate({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      Phone: 'any_telefone'
    })
    expect(httpResponse).toEqual(new ValidationError('Password is weak. Please write password'))
  })

  test('should return error if password haven`t least 8 characters in length', async () => {
    const sut = new ZodValidator(signupSchema)
    const error = sut.validate({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'Pas1#',
      Phone: 'any_telefone'
    })
    expect(error).toEqual(new ValidationError('Password must be at least 8 characters in length'))
  })

  test('should return error if phone is required', async () => {
    const sut = new ZodValidator(signupSchema)
    const httpResponse = sut.validate({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'Password123#'
    })
    expect(httpResponse).toEqual(new ValidationError('phone is required. Please write phone'))
  })

  test('should return error if phone is empty', async () => {
    const sut = new ZodValidator(signupSchema)
    const error = sut.validate({
      name: 'any_name',
      email: 'any_email@gmail.com',
      password: 'Password123#',
      phone: ''
    })
    expect(error).toEqual(new ValidationError('phone is empty. Please write phone'))
  })
})
