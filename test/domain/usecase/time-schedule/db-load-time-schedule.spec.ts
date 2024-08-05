import {
  type ScheduleModel,
  StatusSchedule,
} from '@/domain/model/schedule-model'
import { type LoadSchedulesByBarberIdRepository } from '@/domain/protocols/infra/db'
import { DbLoadTimeSchedules } from '@/domain/usecase'

class LoadSchedulesByBarberIdRepositoryStub
  implements LoadSchedulesByBarberIdRepository
{
  async loadByBarberId(
    barberId: string,
    statusSchedule: StatusSchedule,
  ): Promise<ScheduleModel[]> {
    return await Promise.resolve([
      {
        id: 'any_id',
        status: 'WAITING',
        total_time: 0,
        barberId: 'any_barberId',
      },
      {
        id: 'any_id',
        status: 'WAITING',
        total_time: 0,
        barberId: 'any_barberId',
      },
    ])
  }
}

describe('DbLoadTimeSchedules', () => {
  test('should call LoadSchedulesByBarberIDRepository with params correct', async () => {
    const loadSchedulesByBarberIDRepositoryStub =
      new LoadSchedulesByBarberIdRepositoryStub()
    const sut = new DbLoadTimeSchedules(loadSchedulesByBarberIDRepositoryStub)
    const loadByBarberIdStub = jest.spyOn(
      loadSchedulesByBarberIDRepositoryStub,
      'loadByBarberId',
    )
    await sut.loadByBarberIDAndDate('any_barberId')
    expect(loadByBarberIdStub).toHaveBeenCalledWith(
      'any_barberId',
      StatusSchedule.WAITING,
    )
  })

  test('should throw if LoadSchedulesByBarberIDRepository throws', async () => {
    const loadSchedulesByBarberIDRepositoryStub =
      new LoadSchedulesByBarberIdRepositoryStub()
    const sut = new DbLoadTimeSchedules(loadSchedulesByBarberIDRepositoryStub)
    jest
      .spyOn(loadSchedulesByBarberIDRepositoryStub, 'loadByBarberId')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId')
    expect(response).rejects.toThrow()
  })

  test('should return times if LoadSchedulesByBarberIDRepository no return', async () => {
    const loadSchedulesByBarberIDRepositoryStub =
      new LoadSchedulesByBarberIdRepositoryStub()
    const sut = new DbLoadTimeSchedules(loadSchedulesByBarberIDRepositoryStub)
    jest
      .spyOn(loadSchedulesByBarberIDRepositoryStub, 'loadByBarberId')
      .mockResolvedValueOnce([])
    const response = await sut.loadByBarberIDAndDate('any_barberId')
    expect(response).toEqual([
      { times: '08:00', disabled: false },
      { times: '08:00', disabled: false },
    ])
  })
})
