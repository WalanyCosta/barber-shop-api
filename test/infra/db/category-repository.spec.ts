import { cleanData } from '@/infra/db/prisma/helpers/prisma-helper'
import prisma from '@/infra/db/prisma/helpers/client'
import { CategoryRepository } from '@/infra/db/prisma/'

const createFakeCategoriesData = async (): Promise<any> => {
  return await prisma.category.createMany({
    data: [
      { id: 'any_id', category: 'any_category' },
      { id: 'other_id', category: 'other_category' }
    ]
  })
}

describe('CategoryRepository', () => {
  beforeEach(async () => {
    await cleanData()
  })

  test('should return categories on success', async () => {
    const sut = new CategoryRepository()
    await createFakeCategoriesData()
    const categories = await sut.load()

    expect(categories.length).toBe(2)
    expect(categories[0]?.id).toBeTruthy()
    expect(categories[0]?.id).toBe('any_id')
    expect(categories[0]?.category).toBe('any_category')
  })

  test('should return empty array if load returns empty', async () => {
    const sut = new CategoryRepository()
    const services = await sut.load()
    expect(services).toEqual([])
  })
})
