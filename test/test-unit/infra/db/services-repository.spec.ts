import { ServicesRepository } from './../../../../src/infra/db/prisma/service/service-repository'
import { cleanData } from './../../../../src/infra/db/prisma/helpers/prisma-helper'
import prisma from '../../../../src/infra/db/prisma/helpers/client'

const createFakeServiceData = async (): Promise<void> => {
  await prisma.service.create({
    data: {
      name: 'any_name',
      price: 30.3,
      stars: 3,
      status: 'active',
      category: {
        create: {
          category: 'any_category'
        }
      }
    }
  })
}

describe('AccountRepository', () => {
  beforeEach(async () => {
    await cleanData()
  })

  test('should return services on load success', async () => {
    const sut = new ServicesRepository()
    await createFakeServiceData()
    const services = await sut.load()
    expect(services[0]).toBeTruthy()
    expect(services[0]?.id).toBeTruthy()
    expect(services[0]?.name).toBe('any_name')
    expect(services[0]?.price).toBe(30.3)
    expect(services[0]?.status).toBe('active')
    expect(services[0]?.star).toBe(3)
    expect(services[0]?.category).toBe('any_category')
  })
})
