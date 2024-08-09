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
})
