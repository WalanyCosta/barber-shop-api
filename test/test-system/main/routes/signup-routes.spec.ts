import { cleanData, disconnect } from '@/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '@/main/config/app'
import prisma from '@/infra/db/prisma/helpers/client'

describe('SignUp Routes', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 200 on signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'anyPass#1',
        phone: '999888777'
      })
      .expect(200)
  })

  test('should return 403 if email is exists', async () => {
    await prisma.account.create({
      data: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'anyPass#1',
        phone: 'any_phone',
        accessToken: 'any_phone'
      }
    })
    await request(app)
      .post('/api/signup')
      .send({
        name: 'other_name',
        email: 'any_email@mail.com',
        password: 'Pass#1234',
        phone: 'any_phone'
      })
      .expect(403)
  })
})
