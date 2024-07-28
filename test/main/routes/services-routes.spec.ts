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

const mockCreateService = async (): Promise<any> => {
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
    await mockCreateService()
    await request(app)
      .get('/api/services')
      .set('x-access-token', accessToken)
      .expect(200)
  })

  test('should return 403 on load services without accessToken', async () => {
    await request(app)
      .get('/api/services')
      .expect(403)
  })
})

describe('Get /services/:id', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 200 on success', async () => {
    const accessToken = await mockAccessToken()

    const service = await mockCreateService()

    await request(app)
      .get(`/api/services/${service.id}`)
      .set('x-access-token', accessToken)
      .expect(200)
  })
})

describe('Get /services/search', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 200 on success', async () => {
    const accessToken = await mockAccessToken()

    await mockCreateService()

    const typeQuery = 'service'
    const query = 'any_name'
    await request(app)
      .get(`/api/services/search?typeQuery=${typeQuery}&query=${query}`)
      .set('x-access-token', accessToken)
      .expect(200)
  })

  test('should return 400 if typeQuery have value different of "category" and "service"', async () => {
    const accessToken = await mockAccessToken()

    await mockCreateService()

    const typeQuery = 'price'
    const query = 'query'
    await request(app)
      .get(`/api/services/search?typeQuery=${typeQuery}&query=${query}`)
      .set('x-access-token', accessToken)
      .expect(400)
  })
})
