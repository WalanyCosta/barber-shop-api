import { type AddAccountModel, type AddAccountRepository } from './../../../../src/domain/protocols/add-account-repository'
import { type Hasher } from './../../../../src/domain/protocols/hasher'
import { DbAddAccount } from './../../../../src/domain/usecase/db-add-account'
import { type LoadAccountByEmailRepository } from './../../../../src/domain/protocols/load-account-by-email-repository'
import { type AccountModel } from './../../../../src/domain/model/account-model'

interface SutTypes {
  sut: DbAddAccount
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasherStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAddAccount(loadAccountByEmailRepositoryStub, hasherStub, addAccountRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hasherStub,
    addAccountRepositoryStub
  }
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
      return fakeResponseAccount
    }
  }

  return new AddAccountRepositoryStub()
}

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel | null> {
      return await Promise.resolve(null)
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

const makeHasherStub = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await Promise.resolve('any_hash')
    }
  }

  return new HasherStub()
}

const fakeResponseAccount: AccountModel = (
  {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    phone: 'any_phone',
    avatar: 'any_avatar',
    accessToken: 'any_token'
  }
)

const fakeRequestAccount = (
  {
    name: 'any_token',
    email: 'any_email',
    password: 'any_password',
    phone: 'any_phone'
  }
)

describe('DbAddAccount', () => {
  test('should call loadAccountByEmailRepository with correct param', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.add(fakeRequestAccount)
    expect(loadSpy).toHaveBeenCalledWith('any_email')
  })

  test('should return null if loadAccountByEmailRepository returns account', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(fakeResponseAccount)
    const response = await sut.add(fakeRequestAccount)
    expect(response).toBeNull()
  })

  test('should return throw if loadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(error)
    const response = sut.add(fakeRequestAccount)
    expect(response).rejects.toThrow(error)
  })

  test('should call Hasher with correct param', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(fakeRequestAccount)
    expect(hasherSpy).toHaveBeenCalledWith('any_password')
  })

  test('should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error())
    const error = sut.add(fakeRequestAccount)
    await expect(error).rejects.toThrow(new Error())
  })

  test('should call AddAccountRepository with correct param', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      phone: 'any_phone'
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_hash',
      phone: 'any_phone'
    })
  })

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const error = sut.add(fakeRequestAccount)
    await expect(error).rejects.toThrow(new Error())
  })
})
