import { cleanData } from '@/infra/db/prisma/helpers/prisma-helper'
import prisma from '@/infra/db/prisma/helpers/client'
import { CategoryRepository } from '@/infra/db/prisma/'
import {
  mockArrayCategoryModel,
  mockCategoryModel,
} from '../../helper/mock-category-model'

const createFakeCategoriesData = async (): Promise<any> => {
  return await prisma.category.createMany({
    data: mockArrayCategoryModel,
  })
}

const createFakeCategoryData = async (): Promise<any> => {
  return await prisma.category.create({
    data: mockCategoryModel,
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

  test('should return category on success', async () => {
    const sut = new CategoryRepository()
    const { id } = await createFakeCategoryData()
    const category = await sut.loadById(id)

    expect(category).toBeTruthy()
    expect(category?.id).toBeTruthy()
    expect(category?.id).toBe('any_id')
    expect(category?.category).toBe('any_category')
  })
})
