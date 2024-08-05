import { StatusSchedule } from '@/domain/model/schedule-model'
import {
  type LoadBarberByIdRepository,
  type LoadSchedulesByBarberIdRepository,
} from '@/domain/protocols/infra/db'
import { DbLoadTimeSchedules } from '@/domain/usecase'
import { makeLoadBarberByIdRepositoryStub } from '../../mock/mock-barber'
import { makeLoadSchedulesByBarberIdRepositoryStub } from '../../mock/mock-time-schedule'

interface SutTypes {
  sut: DbLoadTimeSchedules
  loadSchedulesByBarberIDRepositoryStub: LoadSchedulesByBarberIdRepository
  loadBarberByIdRepositoryStub: LoadBarberByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSchedulesByBarberIDRepositoryStub =
    makeLoadSchedulesByBarberIdRepositoryStub()
  const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()
  const sut = new DbLoadTimeSchedules(
    loadSchedulesByBarberIDRepositoryStub,
    loadBarberByIdRepositoryStub,
  )

  return {
    sut,
    loadBarberByIdRepositoryStub,
    loadSchedulesByBarberIDRepositoryStub,
  }
}

describe('DbLoadTimeSchedules', () => {
  test('should call LoadBarberByIdRepository with correct id', async () => {
    const { sut, loadBarberByIdRepositoryStub } = makeSut()
    const loadByIdStub = jest.spyOn(loadBarberByIdRepositoryStub, 'loadById')
    await sut.loadByBarberIDAndDate('any_barberId')
    expect(loadByIdStub).toHaveBeenCalledWith('any_barberId')
  })

  test('should throw if LoadBarberByIdRepository throws', async () => {
    const { sut, loadBarberByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadBarberByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId')
    expect(response).rejects.toThrow()
  })

  test('should throw if LoadBarberByIdRepository returns null', async () => {
    const { sut, loadBarberByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadBarberByIdRepositoryStub, 'loadById')
      .mockResolvedValueOnce(null)
    const response = sut.loadByBarberIDAndDate('any_barberId')
    expect(response).rejects.toThrow()
  })

  test('should call LoadSchedulesByBarberIDRepository with correct params', async () => {
    const { sut, loadSchedulesByBarberIDRepositoryStub } = makeSut()
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
    const { sut, loadSchedulesByBarberIDRepositoryStub } = makeSut()
    jest
      .spyOn(loadSchedulesByBarberIDRepositoryStub, 'loadByBarberId')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId')
    expect(response).rejects.toThrow()
  })

  test('should return times if LoadSchedulesByBarberIDRepository no return', async () => {
    const { sut, loadSchedulesByBarberIDRepositoryStub } = makeSut()
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
