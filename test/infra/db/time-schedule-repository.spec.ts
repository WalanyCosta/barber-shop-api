import { cleanData, TimeScheduleRepository } from '@/infra/db/prisma'
import { mockBarberModel } from '../../helpers/mock-barber-model'
import { StatusBarber } from '@/domain/model/barber-model'
import { StatusSchedule } from '@/domain/model/schedule-model'
import prisma from '@/infra/db/prisma/helpers/client'

const createFakeScheduleAndBarberData = async (): Promise<void> => {
  await prisma.$transaction(async (prismaTransaction) => {
    const barber = await prismaTransaction.barber.create({
      data: {
        ...mockBarberModel,
        status: StatusBarber.active,
        birthday: new Date('2024-08-05').toISOString(),
      },
    })
    await prismaTransaction.schedule.createMany({
      data: [
        {
          status: StatusSchedule.WAITING,
          total_time: 0,
          barber_id: barber.id,
        },
        {
          status: StatusSchedule.WAITING,
          total_time: 0,
          barber_id: barber.id,
        },
      ],
    })
  })
}

const createFakeTimeScheduleData = async (): Promise<any[]> => {
  let schedules: any[] = []
  await prisma.$transaction(async (prismaTransaction) => {
    schedules = await prismaTransaction.schedule.findMany()

    await prismaTransaction.time_schedule.createMany({
      data: [
        {
          date_schedule: new Date('2024-08-05'),
          time_schedule: 480,
          schedule_id: schedules[0].id,
        },
        {
          date_schedule: new Date('2024-08-05'),
          time_schedule: 495,
          schedule_id: schedules[1].id,
        },
      ],
    })
  })
  return schedules
}

describe('TimeScheduleRepository', () => {
  beforeEach(async () => {
    await cleanData()
    await createFakeScheduleAndBarberData()
  })
  test('should return array TimeSchedule on success', async () => {
    const schedules = await createFakeTimeScheduleData()
    const scheduleIds = schedules?.map((schedule) => schedule.id)
    const sut = new TimeScheduleRepository()
    const timeSchedules = await sut.loadByDateAndIds('2024-08-05', scheduleIds)
    expect(timeSchedules.length).toBe(2)
    expect(timeSchedules[0]).toBeTruthy()
    expect(timeSchedules[0]?.id).toBeTruthy()
    expect(timeSchedules[0]?.dateSchedule).toBe(
      new Date('2024-08-05').toISOString(),
    )
    expect(timeSchedules[0]?.timeSchedule).toBe(480)
    expect(timeSchedules[0]?.scheduleId).toBe(scheduleIds[0])
  })

  test('should return empty array if loadByDateAndIds return empty array', async () => {
    const sut = new TimeScheduleRepository()
    const timeSchedules = await sut.loadByDateAndIds('2024-08-05', [
      'any_id',
      'other_id',
    ])
    expect(timeSchedules.length).toBe(0)
  })
})
