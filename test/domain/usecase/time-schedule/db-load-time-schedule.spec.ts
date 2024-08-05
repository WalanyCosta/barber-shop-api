import { StatusSchedule } from '@/domain/model/schedule-model'
import {
  type LoadTimeSchedulesByDateAndIdsRepository,
  type LoadBarberByIdRepository,
  type LoadSchedulesByBarberIdRepository,
} from '@/domain/protocols/infra/db'
import { DbLoadTimeSchedules } from '@/domain/usecase'
import { makeLoadBarberByIdRepositoryStub } from '../../mock/mock-barber'
import {
  makeLoadSchedulesByBarberIdRepositoryStub,
  makeLoadTimeSchedulesByDateAndIdsRepositoryStub,
} from '../../mock/mock-time-schedule'

interface SutTypes {
  sut: DbLoadTimeSchedules
  loadSchedulesByBarberIDRepositoryStub: LoadSchedulesByBarberIdRepository
  loadBarberByIdRepositoryStub: LoadBarberByIdRepository
  loadTimeSchedulesByDateAndIdsRepositoryStub: LoadTimeSchedulesByDateAndIdsRepository
}

const makeSut = (): SutTypes => {
  const loadTimeSchedulesByDateAndIdsRepositoryStub =
    makeLoadTimeSchedulesByDateAndIdsRepositoryStub()
  const loadSchedulesByBarberIDRepositoryStub =
    makeLoadSchedulesByBarberIdRepositoryStub()
  const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()
  const sut = new DbLoadTimeSchedules(
    loadSchedulesByBarberIDRepositoryStub,
    loadBarberByIdRepositoryStub,
    loadTimeSchedulesByDateAndIdsRepositoryStub,
  )

  return {
    sut,
    loadBarberByIdRepositoryStub,
    loadSchedulesByBarberIDRepositoryStub,
    loadTimeSchedulesByDateAndIdsRepositoryStub,
  }
}

describe('DbLoadTimeSchedules', () => {
  test('should call LoadBarberByIdRepository with correct id', async () => {
    const { sut, loadBarberByIdRepositoryStub } = makeSut()
    const loadByIdStub = jest.spyOn(loadBarberByIdRepositoryStub, 'loadById')
    await sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(loadByIdStub).toHaveBeenCalledWith('any_barberId')
  })

  test('should throw if LoadBarberByIdRepository throws', async () => {
    const { sut, loadBarberByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadBarberByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId', 'any_date')

    expect(response).rejects.toThrow()
  })

  test('should throw if LoadBarberByIdRepository returns null', async () => {
    const { sut, loadBarberByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadBarberByIdRepositoryStub, 'loadById')
      .mockResolvedValueOnce(null)
    const response = sut.loadByBarberIDAndDate('', 'any_date')
    expect(response).rejects.toThrow()
  })

  test('should call LoadTimeSchedulesByDateAndIdsRepository with correct params', async () => {
    const { sut, loadTimeSchedulesByDateAndIdsRepositoryStub } = makeSut()
    const loadByIdStub = jest.spyOn(
      loadTimeSchedulesByDateAndIdsRepositoryStub,
      'loadByDateAndIds',
    )
    await sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(loadByIdStub).toHaveBeenCalledWith('any_date', ['any_id', 'any_id'])
  })

  test('should call LoadSchedulesByBarberIDRepository with correct params', async () => {
    const { sut, loadSchedulesByBarberIDRepositoryStub } = makeSut()
    const loadByBarberIdStub = jest.spyOn(
      loadSchedulesByBarberIDRepositoryStub,
      'loadByBarberId',
    )
    await sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(loadByBarberIdStub).toHaveBeenCalledWith(
      'any_barberId',
      StatusSchedule.WAITING,
    )
  })

  test('should throw if LoadSchedulesByBarberIDRepository throws', async () => {
    const { sut, loadSchedulesByBarberIDRepositoryStub } = makeSut()
    jest
      .spyOn(loadSchedulesByBarberIDRepositoryStub, 'loadByBarberId')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(response).rejects.toThrow()
  })

  test('should return times if LoadSchedulesByBarberIDRepository no return', async () => {
    const { sut, loadSchedulesByBarberIDRepositoryStub } = makeSut()
    jest
      .spyOn(loadSchedulesByBarberIDRepositoryStub, 'loadByBarberId')
      .mockResolvedValueOnce([])
    const response = await sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(response).toEqual([
      { times: '08:00', disabled: false },
      { times: '08:00', disabled: false },
    ])
  })
})
