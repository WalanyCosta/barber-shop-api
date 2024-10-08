import jwt from 'jsonwebtoken'
import { cleanData, disconnect } from '@/infra/db/prisma/helpers/prisma-helper'
import request from 'supertest'
import app from '@/main/config/app'
import prisma from '@/infra/db/prisma/helpers/client'
import { mockBarberModel } from '../../helpers/mock-barber-model'

const mockAccessToken = async (): Promise<string> => {
  const account = await prisma.account.create({
    data: {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_number_phone',
      accessToken: '',
    },
  })

  const token = jwt.sign({ id: account.id }, String(process.env.PRIVATE_KEY))

  await prisma.account.update({
    where: {
      id: account.id,
    },
    data: {
      accessToken: token,
    },
  })

  return token
}

const mockCreateBarber = async (): Promise<any> => {
  return await prisma.barber.create({
    data: mockBarberModel,
  })
}

describe('Get /barbers/:id', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 200 on success', async () => {
    const accessToken = await mockAccessToken()
    const { id } = await mockCreateBarber()
    await request(app)
      .get(`/api/barbers/${id}`)
      .set('x-access-token', accessToken)
      .expect(200)
  })
})

describe('Get /barbers', () => {
  beforeEach(async () => {
    await cleanData()
  })

  afterAll(async () => {
    await cleanData()
    await disconnect()
  })

  test('should return 200 on success', async () => {
    const accessToken = await mockAccessToken()
    await mockCreateBarber()
    await request(app)
      .get(`/api/barbers`)
      .set('x-access-token', accessToken)
      .expect(200)
  })
})
