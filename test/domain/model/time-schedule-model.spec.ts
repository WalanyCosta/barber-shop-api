import { TimeScheduleModel } from '@/domain/model/time-schedule-model'

describe('TimeScheduleModel', () => {
  test('Should return 450 if calculateTime receive 30 and 450', () => {
    const result = TimeScheduleModel.calculateTime(30, 420)
    expect(result).toBe(450)
  })
})
