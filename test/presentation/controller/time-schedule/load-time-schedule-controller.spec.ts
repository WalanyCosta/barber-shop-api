import { DateInvalidError } from '@/domain/errors/date-invalid-error'
import { makeLoadTimeScheduleStub } from '../../mocks/mock-time-schedule'
import { LoadTimeScheduleController } from '@/presentation/controller'

describe('LoadTimeScheduleController', () => {
  test('should LoadTimeSchedule call with correct params', async () => {
    const date = 'any_date'
    const barberId = 'any_barberId'
    const loadTimeScheduleStub = makeLoadTimeScheduleStub()
    const sut = new LoadTimeScheduleController(loadTimeScheduleStub)
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
    const loadTimeScheduleStub = makeLoadTimeScheduleStub()
    const sut = new LoadTimeScheduleController(loadTimeScheduleStub)
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
})
