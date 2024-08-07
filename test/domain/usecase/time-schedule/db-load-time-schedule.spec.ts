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
  makeVerifyDateIsCurrentOrPassedStub,
} from '../../mock/mock-time-schedule'
import { type VerifyDateIsCurrentOrPassed } from '@/domain/protocols/infra/date'
import { DateInvalidError } from '@/domain/errors/date-invalid-error'

interface SutTypes {
  sut: DbLoadTimeSchedules
  loadSchedulesByBarberIDRepositoryStub: LoadSchedulesByBarberIdRepository
  loadBarberByIdRepositoryStub: LoadBarberByIdRepository
  loadTimeSchedulesByDateAndIdsRepositoryStub: LoadTimeSchedulesByDateAndIdsRepository
  verifyDateIsCurrentOrPassedStub: VerifyDateIsCurrentOrPassed
}

const mockDate = (date: string = '2024-08-06T05:30:40.450Z'): void => {
  const mockedDate = new Date(date)
  jest.spyOn(global, 'Date').mockImplementationOnce(() => mockedDate)
}

const ResetMock = (): void => {
  jest.restoreAllMocks()
}

const makeSut = (hourStart: number = 480, hourEnd: number = 495): SutTypes => {
  const verifyDateIsCurrentOrPassedStub = makeVerifyDateIsCurrentOrPassedStub()
  const loadTimeSchedulesByDateAndIdsRepositoryStub =
    makeLoadTimeSchedulesByDateAndIdsRepositoryStub()
  const loadSchedulesByBarberIDRepositoryStub =
    makeLoadSchedulesByBarberIdRepositoryStub()
  const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()

  const sut = new DbLoadTimeSchedules(
    loadSchedulesByBarberIDRepositoryStub,
    loadBarberByIdRepositoryStub,
    loadTimeSchedulesByDateAndIdsRepositoryStub,
    hourStart,
    hourEnd,
    verifyDateIsCurrentOrPassedStub,
  )

  return {
    sut,
    loadBarberByIdRepositoryStub,
    loadSchedulesByBarberIDRepositoryStub,
    loadTimeSchedulesByDateAndIdsRepositoryStub,
    verifyDateIsCurrentOrPassedStub,
  }
}

describe('DbLoadTimeSchedules', () => {
  beforeAll(() => {
    mockDate()
  })

  afterAll(() => {
    ResetMock()
  })

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

  test('should throw if LoadTimeSchedulesByDateAndIdsRepository throws', async () => {
    const { sut, loadTimeSchedulesByDateAndIdsRepositoryStub } = makeSut()
    jest
      .spyOn(loadTimeSchedulesByDateAndIdsRepositoryStub, 'loadByDateAndIds')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(response).rejects.toThrow()
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
      { times: '08:15', disabled: false },
    ])
  })

  test('should call verifyDateIsCurrentOrPassedStub with correct date', async () => {
    const { sut, verifyDateIsCurrentOrPassedStub } = makeSut()
    const isCurrentOrPastSpy = jest.spyOn(
      verifyDateIsCurrentOrPassedStub,
      'isPassed',
    )
    await sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(isCurrentOrPastSpy).toHaveBeenCalledWith('any_date')
  })

  test('should throw if verifyDateIsCurrentOrPassedStub throws', async () => {
    const { sut, verifyDateIsCurrentOrPassedStub } = makeSut()
    jest
      .spyOn(verifyDateIsCurrentOrPassedStub, 'isPassed')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    await expect(response).rejects.toThrow()
  })

  test('should throw if verifyDateIsCurrentOrPassedStub throws DateInvalidError', async () => {
    const { sut, verifyDateIsCurrentOrPassedStub } = makeSut()
    jest
      .spyOn(verifyDateIsCurrentOrPassedStub, 'isPassed')
      .mockResolvedValueOnce(false)
    const response = sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(response).rejects.toThrow(
      new DateInvalidError('Não é possivel trazer horas com datas antigas'),
    )
  })

  test('should call VerifyDateIsCurrent with correct date', async () => {
    const { sut, verifyDateIsCurrentOrPassedStub } = makeSut()
    const isCurrentStub = jest.spyOn(
      verifyDateIsCurrentOrPassedStub,
      'isCurrent',
    )
    await sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(isCurrentStub).toHaveBeenCalledWith('any_date')
  })

  test('should throw if VerifyDateIsCurrent throws', async () => {
    const { sut, verifyDateIsCurrentOrPassedStub } = makeSut()
    jest
      .spyOn(verifyDateIsCurrentOrPassedStub, 'isCurrent')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    await expect(response).rejects.toThrow()
  })

  test.failing(
    'should return time disabled if VerifyDateIsCurrent return true and time is Passed',
    async () => {
      const {
        sut,
        verifyDateIsCurrentOrPassedStub,
        loadSchedulesByBarberIDRepositoryStub,
      } = makeSut()
      jest
        .spyOn(verifyDateIsCurrentOrPassedStub, 'isCurrent')
        .mockResolvedValueOnce(true)
      jest
        .spyOn(loadSchedulesByBarberIDRepositoryStub, 'loadByBarberId')
        .mockResolvedValueOnce([])
      const response = await sut.loadByBarberIDAndDate(
        'any_barberId',
        'any_date',
      )
      expect(response).toEqual([
        { times: '08:00', disabled: true },
        { times: '08:15', disabled: true },
      ])
      jest.restoreAllMocks()
    },
  )

  test('should generate hours on success', async () => {
    const { sut } = makeSut(480, 525)
    const response = await sut.loadByBarberIDAndDate('any_barberId', 'any_date')
    expect(response).toEqual([
      { times: '08:00', disabled: true },
      { times: '08:15', disabled: true },
      { times: '08:30', disabled: false },
      { times: '08:45', disabled: false },
    ])
  })
})
