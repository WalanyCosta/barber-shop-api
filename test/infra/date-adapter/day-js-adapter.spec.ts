import { DayjsAdapter } from '@/infra/libs/'
import * as dayjs from '@/infra/libs/date-adapter/config/instance-day-js'

describe('DayjsAdapter', () => {
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

  test('should return true on success', async () => {
    const date = new Date('2024-08-08').toISOString()
    const sut = new DayjsAdapter()
    const response = await sut.isPassed(date)
    expect(response).toBeTruthy()
  })
})

describe('DayjsAdapter IsSame', () => {
  test('should dayjs.isSame call with correct date', async () => {
    const date = new Date().toISOString()
    const mockedIsSame = jest.spyOn(dayjs, 'isSame')
    const sut = new DayjsAdapter()
    await sut.isCurrent(date)
    expect(mockedIsSame).toHaveBeenCalledWith(date)
  })
})
