import { cleanData, disconnect } from './../../../../src/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '../../../../src/main/config/app'
describe('SignUp Routes', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await disconnect()
  })

  test('should return 200 on signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'anyPass#1',
        phone: 'any_phone'
      })
      .expect(200)
  })
})
