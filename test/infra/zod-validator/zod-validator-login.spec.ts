import { LoginSchema, ZodValidator } from '@/infra/libs/validator'
import { ValidationError } from '@/presentation/errors'

describe('ZodValidator-Login', () => {
  test('should return error if email is required', () => {
    const sut = new ZodValidator(LoginSchema)
    const error = sut.validate({})
    expect(error).toEqual(
      new ValidationError('email is required. Please write email'),
    )
  })

  test('should return error if email is empty', () => {
    const sut = new ZodValidator(LoginSchema)
    const error = sut.validate({
      email: '',
    })
    expect(error).toEqual(
      new ValidationError('email is empty. Please write email'),
    )
  })

  test('should return error if email is invalid', () => {
    const sut = new ZodValidator(LoginSchema)
    const error = sut.validate({
      email: 'any_email',
    })
    expect(error).toEqual(
      new ValidationError('email is invalid. Please write email correctly'),
    )
  })

  test('should return error if password is required', () => {
    const sut = new ZodValidator(LoginSchema)
    const error = sut.validate({
      email: 'any_email@mail.com',
    })
    expect(error).toEqual(
      new ValidationError('password is required. Please write password'),
    )
  })

  test('should return error password is weak', async () => {
    const sut = new ZodValidator(LoginSchema)
    const httpResponse = sut.validate({
      email: 'any_email@mail.com',
      password: 'any_password',
    })
    expect(httpResponse).toEqual(
      new ValidationError('Password is weak. Please write password'),
    )
  })

  test('should return error if password haven`t least 8 characters in length', async () => {
    const sut = new ZodValidator(LoginSchema)
    const error = sut.validate({
      email: 'any_email@mail.com',
      password: 'Pas1#',
    })
    expect(error).toEqual(
      new ValidationError('Password must be at least 8 characters in length'),
    )
  })
})
