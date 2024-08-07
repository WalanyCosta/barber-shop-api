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

  test('should return 00:00 if convertHoursMinutesToHoursString not receive', () => {
    const hours = TimeScheduleModel.convertHoursMinutesToHoursString()
    expect(hours).toBe('00:00')
  })

  test('should return true if verifyTimeExists times are sames', () => {
    const mockedDate = new Date('2024-08-06T05:30:40.450Z') // Janeiro é o mês 0, 15:00:00 horas
    jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)

    const timeSchedule = new TimeScheduleModel(
      'any_id',
      'any_date',
      495,
      'any_scheduleId',
    )
    const result = timeSchedule.verifyTimeExists(495)
    expect(result).toBeTruthy()

    jest.restoreAllMocks()
  })

  test('should return false if verifyTimeIsBeforeCurrent times is old', () => {
    const mockedDate = new Date('2024-08-06T17:55:37.450Z') // Janeiro é o mês 0, 15:00:00 horas
    jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)

    const timeSchedule = new TimeScheduleModel(
      'any_id',
      'any_date',
      495,
      'any_scheduleId',
    )
    const result = timeSchedule.verifyIsBeforeCurrent(495)
    expect(result).toBeFalsy()

    jest.restoreAllMocks()
  })
})
