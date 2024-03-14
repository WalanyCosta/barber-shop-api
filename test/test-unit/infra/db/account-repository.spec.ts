import { cleanData } from './../../../../src/infra/db/prisma/helpers/prisma-helper'
import { AccountRepository } from './../../../../src/infra/db/prisma/account/account-repository'
import prisma from '../../../../src/infra/db/prisma/helpers/client'
import { type AccountModel } from '../../../../src/domain/model/account-model'

const createFakeAccountData = async (accessToken = ''): Promise<AccountModel> => {
  return await prisma.account.create({
    data: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      phone: 'any_phone',
      accessToken
    }
  }) as AccountModel
}

describe('AccountRepository', () => {
  beforeEach(async () => {
    await cleanData()
  })

  test('should return an account on add success', async () => {
    const sut = new AccountRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      phone: 'any_phone'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
    expect(account.phone).toBe('any_phone')
  })

  test('should return an account on loadByEmail success', async () => {
    const sut = new AccountRepository()
    await createFakeAccountData()
    const account = await sut.load('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('any_name')
    expect(account?.email).toBe('any_email@mail.com')
    expect(account?.password).toBe('any_password')
    expect(account?.phone).toBe('any_phone')
  })

  test('should return null if loadByEmail fails', async () => {
    const sut = new AccountRepository()
    const account = await sut.load('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('should update the account AccessToken on updateAccessToken success', async () => {
    const sut = new AccountRepository()
    const account = await createFakeAccountData()
    await sut.updateAccessToken(account.id, 'any_token')
    const accountUpdated = await prisma.account.findUnique({ where: { id: account.id } })
    expect(accountUpdated).toBeTruthy()
    expect(accountUpdated?.accessToken).toBe('any_token')
  })

  test('should return an account on loadByToken success', async () => {
    const sut = new AccountRepository()
    await createFakeAccountData('any_token')
    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account?.id).toBeTruthy()
    expect(account?.name).toBe('any_name')
    expect(account?.email).toBe('any_email@mail.com')
    expect(account?.password).toBe('any_password')
    expect(account?.phone).toBe('any_phone')
  })

  test('should return null if loadByToken fails', async () => {
    const sut = new AccountRepository()
    const account = await sut.loadByToken('any_token')
    expect(account).toBeFalsy()
  })
})
