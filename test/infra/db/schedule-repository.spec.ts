import { StatusBarber } from '@/domain/model/barber-model'
import prisma from '@/infra/db/prisma/helpers/client'
import { mockBarberModel } from '../../helpers/mock-barber-model'
import { cleanData } from '@/infra/db/prisma'
import { StatusSchedule } from '@/domain/model/schedule-model'
import { ScheduleRepository } from '@/infra/db/prisma/repositories/schedule/schedule-repository'

const createFakeScheduleData = async (): Promise<any> => {
  let barber
  await prisma.$transaction(async (p) => {
    barber = await p.barber.create({
      data: {
        ...mockBarberModel,
        status: StatusBarber.active,
        birthday: '2024-08-05T12:57:18.446Z',
      },
    })

    await p.schedule.create({
      data: {
        status: StatusSchedule.WAITING,
        total_time: 0,
        barber_id: barber.id,
      },
    })
  })

  return barber
}

describe('AccountRepository', () => {
  beforeEach(async () => {
    await cleanData()
  })

  test('should return schedules on load success', async () => {
    const barber = await createFakeScheduleData()
    const sut = new ScheduleRepository()
    const schedules = await sut.loadByBarberId(
      barber?.id,
      StatusSchedule.WAITING,
    )
    expect(schedules[0]).toBeTruthy()
    expect(schedules[0]?.id).toBeTruthy()
    expect(schedules[0]?.total_time).toBe(0)
    expect(schedules[0]?.status).toBe(StatusSchedule.WAITING)
    expect(schedules[0]?.barberId).toBe('any_id')
  })
})
