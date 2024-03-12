import { cleanData, disconnect } from '../../../../src/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '../../../../src/main/config/app'
import prisma from '../../../../src/infra/db/prisma/helpers/client'

describe('Get /services', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 204 when database is empty', async () => {
    await request(app)
      .get('/api/services')
      .expect(204)
  })

  test('should return 200 on success', async () => {
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

    await request(app)
      .get('/api/services')
      .expect(200)
  })
})
