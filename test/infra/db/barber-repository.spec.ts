import { cleanData } from '@/infra/db/prisma/helpers/prisma-helper'
import prisma from '@/infra/db/prisma/helpers/client'
import { BarberRepository } from '@/infra/db/prisma'
import { mockBarberModel } from '../../helpers/mock-barber-model'
import { StatusBarber } from '@/domain/model/barber-model'

const createFakeBarberData = async (): Promise<any> => {
  return await prisma.barber.create({
    data: mockBarberModel,
  })
}

const createFakeBarbersData = async (
  status: StatusBarber = StatusBarber.active,
): Promise<any> => {
  return await prisma.barber.create({
    data: { ...mockBarberModel, status },
  })
}

describe('BarberRepository', () => {
  beforeEach(async () => {
    await cleanData()
  })

  test('should return barber on success', async () => {
    const { id } = await createFakeBarberData()
    const sut = new BarberRepository()
    const barber = await sut.loadById(id)

    expect(barber).toBeTruthy()
    expect(barber?.id).toBeTruthy()
    expect(barber?.id).toBe('any_id')
    expect(barber?.name).toBe('any_name')
    expect(barber?.birthday).toBe('any_birthday')
    expect(barber?.start).toBe(5)
    expect(barber?.email).toBe('any_email')
  })

  test('should return empty array if status is disable', async () => {
    await createFakeBarbersData(StatusBarber.disable)
    const sut = new BarberRepository()
    const barbers = await sut.load(StatusBarber.active)

    expect(barbers.length).toBe(0)
    expect(barbers).toEqual([])
  })
})
