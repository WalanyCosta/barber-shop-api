import { cleanData, disconnect } from '../../../../src/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '../../../../src/main/config/app'

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
})
