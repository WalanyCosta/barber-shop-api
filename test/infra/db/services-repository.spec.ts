import { ServicesRepository } from '@/infra/db/prisma'
import { cleanData } from '@/infra/db/prisma/helpers/prisma-helper'
import prisma from '@/infra/db/prisma/helpers/client'

const createFakeServiceData = async (): Promise<any> => {
  return await prisma.service.create({
    data: {
      service: 'any_name',
      discount: 0.0,
      duraction: 900,
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
    expect(services[0]?.service).toBe('any_name')
    expect(services[0]?.price).toBe(30.3)
    expect(services[0]?.status).toBe('active')
    expect(services[0]?.stars).toBe(3)
    expect(services[0]?.category).toBe('any_category')
  })

  test('should return empty array if load returns empty', async () => {
    const sut = new ServicesRepository()
    const services = await sut.load()
    expect(services).toEqual([])
  })

  test('should return ServiceModel if loadById not returns empty', async () => {
    const sut = new ServicesRepository()
    const newService = await createFakeServiceData()
    const service = await sut.loadById(newService?.id)
    expect(service).toBeTruthy()
    expect(service?.id).toBeTruthy()
    expect(service?.service).toBe('any_name')
    expect(service?.price).toBe(30.3)
    expect(service?.status).toBe('active')
    expect(service?.stars).toBe(3)
    expect(service?.category).toBe('any_category')
  })

  test('should return ServiceModel array if filter not returns empty', async () => {
    const sut = new ServicesRepository()
    await createFakeServiceData()
    const services = await sut.filter('service', 'any_name')
    expect(services[0]).toBeTruthy()
    expect(services[0]?.id).toBeTruthy()
    expect(services[0]?.service).toBe('any_name')
    expect(services[0]?.price).toBe(30.3)
    expect(services[0]?.status).toBe('active')
    expect(services[0]?.stars).toBe(3)
    expect(services[0]?.category).toBe('any_category')
  })
})
