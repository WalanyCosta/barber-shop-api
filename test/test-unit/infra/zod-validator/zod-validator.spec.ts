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
})
