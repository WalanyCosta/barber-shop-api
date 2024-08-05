import {
  type ScheduleModel,
  StatusSchedule,
} from '@/domain/model/schedule-model'
import { type LoadSchedulesByBarberIdRepository } from '@/domain/protocols/infra/db'
import { DbLoadTimeSchedules } from '@/domain/usecase'
import { makeLoadBarberByIdRepositoryStub } from '../../mock/mock-barber'

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
  test('should call LoadBarberByIdRepository with correct id', async () => {
    const loadSchedulesByBarberIDRepositoryStub =
      new LoadSchedulesByBarberIdRepositoryStub()
    const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()
    const sut = new DbLoadTimeSchedules(
      loadSchedulesByBarberIDRepositoryStub,
      loadBarberByIdRepositoryStub,
    )
    const loadByIdStub = jest.spyOn(loadBarberByIdRepositoryStub, 'loadById')
    await sut.loadByBarberIDAndDate('any_barberId')
    expect(loadByIdStub).toHaveBeenCalledWith('any_barberId')
  })

  test('should throw if LoadBarberByIdRepository throws', async () => {
    const loadSchedulesByBarberIDRepositoryStub =
      new LoadSchedulesByBarberIdRepositoryStub()
    const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()
    const sut = new DbLoadTimeSchedules(
      loadSchedulesByBarberIDRepositoryStub,
      loadBarberByIdRepositoryStub,
    )
    jest
      .spyOn(loadBarberByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId')
    expect(response).rejects.toThrow()
  })

  test('should call LoadSchedulesByBarberIDRepository with correct params', async () => {
    const loadSchedulesByBarberIDRepositoryStub =
      new LoadSchedulesByBarberIdRepositoryStub()
    const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()
    const sut = new DbLoadTimeSchedules(
      loadSchedulesByBarberIDRepositoryStub,
      loadBarberByIdRepositoryStub,
    )
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
    const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()
    const sut = new DbLoadTimeSchedules(
      loadSchedulesByBarberIDRepositoryStub,
      loadBarberByIdRepositoryStub,
    )
    jest
      .spyOn(loadSchedulesByBarberIDRepositoryStub, 'loadByBarberId')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId')
    expect(response).rejects.toThrow()
  })

  test('should return times if LoadSchedulesByBarberIDRepository no return', async () => {
    const loadSchedulesByBarberIDRepositoryStub =
      new LoadSchedulesByBarberIdRepositoryStub()
    const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()
    const sut = new DbLoadTimeSchedules(
      loadSchedulesByBarberIDRepositoryStub,
      loadBarberByIdRepositoryStub,
    )
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
