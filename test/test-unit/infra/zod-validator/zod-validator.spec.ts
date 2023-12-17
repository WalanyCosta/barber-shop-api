import { ValidationError } from './../../../../src/presentation/errors/validation-error'
import { ZodValidator } from '../../../../src/infra/validator/zod-validator'
import { signupSchema } from './schema/signup-schema'

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
})
