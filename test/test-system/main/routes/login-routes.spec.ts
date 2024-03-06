import { cleanData, disconnect } from '../../../../src/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '../../../../src/main/config/app'
import prisma from '../../../../src/infra/db/prisma/helpers/client'
import { hash } from 'bcrypt'

describe('SignUp Routes', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 200 on success', async () => {
    const password = await hash('anyPass#1', 12)
    const account = await prisma.account.create({
      data: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password,
        phone: 'any_phone',
        accessToken: 'any_phone'
      }
    })
    if (account) {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'anyPass#1'
        })
        .expect(200)
    }
  })
})
