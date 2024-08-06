import { TimeScheduleModel } from '@/domain/model/time-schedule-model'

describe('TimeScheduleModel', () => {
  test('Should return 450 if calculateTime receive 30 and 450', () => {
    const result = TimeScheduleModel.calculateTime(30, 420)
    expect(result).toBe(450)
  })

  test('Should return 495 if calculateTime no receive values', () => {
    const result = TimeScheduleModel.calculateTime()
    expect(result).toBe(495)
  })

  test('should return 08:15 if convertHoursMinutesToHoursString receive 495', () => {
    const hours = TimeScheduleModel.convertHoursMinutesToHoursString(495)
    expect(hours).toBe('08:15')
  })
})
