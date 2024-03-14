import jwt from 'jsonwebtoken'
import { cleanData, disconnect } from '../../../../src/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '../../../../src/main/config/app'
import prisma from '../../../../src/infra/db/prisma/helpers/client'

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

describe('Get /services', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 204 when database is empty', async () => {
    const accessToken = await mockAccessToken()
    await request(app)
      .get('/api/services')
      .set('x-access-token', accessToken)
      .expect(204)
  })

  test('should return 200 on success', async () => {
    const accessToken = await mockAccessToken()

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
      .set('x-access-token', accessToken)
      .expect(200)
  })
})
