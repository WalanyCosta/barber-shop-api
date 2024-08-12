import { DayjsAdapter } from '@/infra/libs/'
import * as dayjs from '@/infra/libs/date-adapter/config/instance-day-js'
import MockDate from 'mockdate'

describe('DayjsAdapter isBefore', () => {
  test('should dayjs.isBefore call with correct date', async () => {
    const date = new Date().toISOString()
    const mockedDayjs = jest.spyOn(dayjs, 'isBefore')
    const sut = new DayjsAdapter()
    await sut.isPassed(date)
    expect(mockedDayjs).toHaveBeenCalledWith(date)
  })

  test('should throw if dayjs.isBefore throws', async () => {
    const date = new Date().toISOString()
    jest.spyOn(dayjs, 'isBefore').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new DayjsAdapter()
    const response = sut.isPassed(date)
    expect(response).rejects.toThrow()
  })

  test('should return false if date isn`t current', async () => {
    const mockedDate = '2024-08-06T05:30:40.450Z'
    MockDate.set(mockedDate)
    jest.spyOn(dayjs, 'isBefore').mockImplementationOnce(() => false)
    const sut = new DayjsAdapter()
    const response = await sut.isPassed(new Date('2024-08-07').toISOString())
    expect(response).toBeFalsy()
    MockDate.reset()
  })

  test('should return true on success', async () => {
    const mockedDate = '2024-08-06T05:30:40.450Z'
    MockDate.set(mockedDate)

    const date = new Date('2024-08-07').toISOString()
    const sut = new DayjsAdapter()
    const response = await sut.isPassed(date)
    expect(response).toBeTruthy()

    MockDate.reset()
  })
})

describe('DayjsAdapter IsSame', () => {
  beforeAll(() => {
    const mockedDate = '2024-08-06T05:30:40.450Z'
    MockDate.set(mockedDate)
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should dayjs.isSame call with correct date', async () => {
    const date = new Date().toISOString()
    const mockedIsSame = jest.spyOn(dayjs, 'isSame')
    const sut = new DayjsAdapter()
    await sut.isCurrent(date)
    expect(mockedIsSame).toHaveBeenCalledWith(date)
  })

  test('should throw if dayjs.isSame throws', async () => {
    const date = new Date().toISOString()
    jest.spyOn(dayjs, 'isSame').mockImplementationOnce(() => {
      throw new Error()
    })
    const sut = new DayjsAdapter()
    const response = sut.isCurrent(date)
    expect(response).rejects.toThrow()
  })

  test('should return true on success', async () => {
    const sut = new DayjsAdapter()
    const response = await sut.isCurrent(new Date().toISOString())
    expect(response).toBeTruthy()
  })
})
