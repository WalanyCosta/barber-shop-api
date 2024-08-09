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
})
