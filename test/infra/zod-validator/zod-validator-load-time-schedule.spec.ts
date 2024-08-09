import { ValidationError } from '@/presentation/errors/validation-error'
import { loadTimeScheduleSchema, ZodValidator } from '@/infra/libs/validator'

describe('ZodValidator - LoadTimeScheduleSchema', () => {
  test('should return error if barberId is required', () => {
    const sut = new ZodValidator(loadTimeScheduleSchema)
    const error = sut.validate({})
    expect(error).toEqual(new ValidationError('barberId is required'))
  })
})
