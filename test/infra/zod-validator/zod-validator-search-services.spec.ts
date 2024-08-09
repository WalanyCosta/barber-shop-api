import { ValidationError } from '@/presentation/errors/validation-error'
import { searchServiceSchema, ZodValidator } from '@/infra/libs/validator'

describe('ZodValidator - SearchServices', () => {
  test('should return error if typeQuery is required', () => {
    const sut = new ZodValidator(searchServiceSchema)
    const error = sut.validate({})
    expect(error).toEqual(new ValidationError('typeQuery is required.'))
  })

  test('should return error if typeQuery is empty', () => {
    const sut = new ZodValidator(searchServiceSchema)
    const error = sut.validate({
      typeQuery: '',
    })
    expect(error).toEqual(
      new ValidationError(
        "Invalid enum value. Expected 'service' | 'category', received ''",
      ),
    )
  })

  test('should return error if query is required', () => {
    const sut = new ZodValidator(searchServiceSchema)
    const error = sut.validate({
      typeQuery: 'service',
    })
    expect(error).toEqual(new ValidationError('query is required.'))
  })

  test('should return error if query is empty', () => {
    const sut = new ZodValidator(searchServiceSchema)
    const error = sut.validate({
      typeQuery: 'service',
      query: '',
    })
    expect(error).toEqual(
      new ValidationError('query is empty. Please to write query.'),
    )
  })
})
