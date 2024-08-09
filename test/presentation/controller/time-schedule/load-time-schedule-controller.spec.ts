import { DateInvalidError } from '@/domain/errors/date-invalid-error'
import {
  makeLoadTimeScheduleStub,
  mockResultTimes,
} from '../../mocks/mock-time-schedule'
import { LoadTimeScheduleController } from '@/presentation/controller'
import { NotExistsRegister } from '@/presentation/errors'
import { makeValidatorStub } from '../../mocks'
import { type LoadTimeSchedule } from '@/domain/protocols/presentation'
import { type Validator } from '@/presentation/protocols/validator'

interface SutTypes {
  sut: LoadTimeScheduleController
  loadTimeScheduleStub: LoadTimeSchedule
  validatorStub: Validator
}

const makeSut = (): SutTypes => {
  const loadTimeScheduleStub = makeLoadTimeScheduleStub()
  const validatorStub = makeValidatorStub()
  const sut = new LoadTimeScheduleController(
    loadTimeScheduleStub,
    validatorStub,
  )

  return {
    sut,
    loadTimeScheduleStub,
    validatorStub,
  }
}

describe('LoadTimeScheduleController', () => {
  test('should LoadTimeSchedule call with correct params', async () => {
    const date = 'any_date'
    const barberId = 'any_barberId'
    const { sut, loadTimeScheduleStub } = makeSut()
    const loadByBarberIDAndDateSpy = jest.spyOn(
      loadTimeScheduleStub,
      'loadByBarberIDAndDate',
    )
    await sut.handle({
      params: {
        barberId,
      },
      query: {
        dateSchedule: date,
      },
    })
    expect(loadByBarberIDAndDateSpy).toHaveBeenCalledWith(barberId, date)
  })

  test('should throw if LoadTimeSchedule throws DateInvalidError', async () => {
    const error = new DateInvalidError('Essa data já passou!')
    const { sut, loadTimeScheduleStub } = makeSut()
    jest
      .spyOn(loadTimeScheduleStub, 'loadByBarberIDAndDate')
      .mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        barberId: 'any_barberId',
      },
      query: {
        dateSchedule: 'yesterday_date',
      },
    })
    expect(response).toEqual({
      statusCode: 400,
      body: error,
    })
  })

  test('should throw if LoadTimeSchedule throws NotExistsRegister', async () => {
    const error = new NotExistsRegister('Not exists register with id')
    const { sut, loadTimeScheduleStub } = makeSut()
    jest
      .spyOn(loadTimeScheduleStub, 'loadByBarberIDAndDate')
      .mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        barberId: 'any_accountId',
      },
      query: {
        dateSchedule: 'yesterday_date',
      },
    })
    expect(response).toEqual({
      statusCode: 400,
      body: error,
    })
  })

  test('should throw if LoadTimeSchedule throws error', async () => {
    const error = new Error()
    const { sut, loadTimeScheduleStub } = makeSut()
    jest
      .spyOn(loadTimeScheduleStub, 'loadByBarberIDAndDate')
      .mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        barberId: 'any_accountId',
      },
      query: {
        dateSchedule: 'yesterday_date',
      },
    })
    expect(response).toEqual({
      statusCode: 500,
      body: error,
    })
  })

  test('should call Validator with correct params', async () => {
    const dateSchedule = 'any_date'
    const barberId = 'any_barberId'
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle({
      params: {
        barberId,
      },
      query: {
        dateSchedule,
      },
    })
    expect(validateSpy).toHaveBeenCalledWith({ dateSchedule, barberId })
  })

  test('should return 403 if Validator throws', async () => {
    const error = new Error()
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error)
    const response = await sut.handle({
      params: {
        barberId: 'any_date',
      },
      query: {
        dateSchedule: 'any_barberId',
      },
    })
    expect(response).toEqual({
      statusCode: 403,
      body: error,
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        barberId: 'any_date',
      },
      query: {
        dateSchedule: 'any_barberId',
      },
    })
    expect(response).toEqual({
      statusCode: 200,
      body: mockResultTimes,
    })
  })
})
