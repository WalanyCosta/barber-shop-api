import jwt from 'jsonwebtoken'
import { cleanData, disconnect } from '@/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '@/main/config/app'
import prisma from '@/infra/db/prisma/helpers/client'

const mockAccessToken = async (): Promise<string> => {
  const account = await prisma.account.create({
    data: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_number_phone',
      accessToken: ''
    }
  })

  const token = jwt.sign({ id: account.id }, String(process.env.PRIVATE_KEY))

  await prisma.account.update({
    where: {
      id: account.id
    },
    data: {
      accessToken: token
    }
  })

  return token
}

describe('Get /account', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 200 on success', async () => {
    const token = await mockAccessToken()

    await request(app)
      .get('/api/account')
      .set('x-access-token', token)
      .expect(200)
  })
})
