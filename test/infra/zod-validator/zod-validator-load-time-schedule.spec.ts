import { ValidationError } from '@/presentation/errors/validation-error'
import { loadTimeScheduleSchema, ZodValidator } from '@/infra/libs/validator'

describe('ZodValidator - LoadTimeScheduleSchema', () => {
  test('should return error if barberId is required', () => {
    const sut = new ZodValidator(loadTimeScheduleSchema)
    const error = sut.validate({})
    expect(error).toEqual(new ValidationError('barberId is required'))
  })

  test('should return error if barberId type is invalid', () => {
    const sut = new ZodValidator(loadTimeScheduleSchema)
    const error = sut.validate({
      barberId: 30,
    })
    expect(error).toEqual(new ValidationError('barberId type is invalid'))
  })

  test('should return error if barberId is empty', () => {
    const sut = new ZodValidator(loadTimeScheduleSchema)
    const error = sut.validate({
      barberId: '',
    })
    expect(error).toEqual(new ValidationError('barberId is empty'))
  })

  test('should return error if dateSchedule is required', () => {
    const sut = new ZodValidator(loadTimeScheduleSchema)
    const error = sut.validate({
      barberId: 'any_barberId',
    })
    expect(error).toEqual(new ValidationError('dateSchedule is required'))
  })

  test('should return error if dateSchedule type is invalid', () => {
    const sut = new ZodValidator(loadTimeScheduleSchema)
    const error = sut.validate({
      barberId: 'any_barberId',
      dateSchedule: null,
    })
    expect(error).toEqual(new ValidationError('dateSchedule type is invalid'))
  })

  test('should return error if dateSchedule format invalid', () => {
    const sut = new ZodValidator(loadTimeScheduleSchema)
    const error = sut.validate({
      barberId: 'any_barberId',
      dateSchedule: '2024-08-09',
    })
    expect(error).toEqual(new ValidationError('dateSchedule format is invalid'))
  })
})
