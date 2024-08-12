import jwt from 'jsonwebtoken'
import { cleanData, disconnect } from '@/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '@/main/config/app'
import prisma from '@/infra/db/prisma/helpers/client'
import { mockBarberModel } from '../../helpers/mock-barber-model'
import { StatusSchedule } from '@/domain/model/schedule-model'
import { StatusBarber } from '@/domain/model/barber-model'
import MockDate from 'mockdate'

const mockAccessToken = async (): Promise<string> => {
  const account = await prisma.account.create({
    data: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_number_phone',
      accessToken: '',
    },
  })

  const token = jwt.sign({ id: account.id }, String(process.env.PRIVATE_KEY))

  await prisma.account.update({
    where: {
      id: account.id,
    },
    data: {
      accessToken: token,
    },
  })

  return token
}

const createFakeScheduleAndBarberData = async (): Promise<any> => {
  let barber
  await prisma.$transaction(async (prismaTransaction) => {
    barber = await prismaTransaction.barber.create({
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

  return barber
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
describe('Get /timeschedules/:barber/times?dateSchedule', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 200 if date is current', async () => {
    const mockDate = '2024-08-14T00:00:00.000Z'

    MockDate.set(mockDate)

    const accessToken = await mockAccessToken()
    const barber = await createFakeScheduleAndBarberData()
    await createFakeTimeScheduleData()
    await request(app)
      .get(
        `/api/timeschedules/${barber.id}/times?dateSchedule=${new Date().toISOString()}`,
      )
      .set('x-access-token', accessToken)
      .expect(200)

    MockDate.reset()
  })
})
