import { AccountRepository } from './../../../../src/infra/db/prisma/account/account-repository'
import { prismaMock } from './../../../../src/infra/db/prisma/helpers/singleton'
import { type AccountModel } from '../../../../src/domain/model/account-model'

const fakeAccount: AccountModel = ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  phone: 'any_phone',
  avatar: '',
  accessToken: ''
})

describe('AccountRepository', () => {
  test('should return an account on add success', async () => {
    const sut = new AccountRepository()
    prismaMock.account.create.mockResolvedValueOnce(fakeAccount)
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
    prismaMock.account.findFirst.mockResolvedValueOnce(fakeAccount)
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
    prismaMock.account.findFirst.mockResolvedValueOnce(null)
    const account = await sut.load('any_email@mail.com')
    expect(account).toBeFalsy()
  })
})
