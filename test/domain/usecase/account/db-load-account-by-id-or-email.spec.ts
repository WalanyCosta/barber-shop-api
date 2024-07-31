import { NotExistsRegister } from '@/presentation/errors'
import { makeLoadAccountByIdOrEmailRepositoryStub } from '../../mock/mock-account'
import { DbLoadAccountByIdOrEmail } from '@/domain/usecase/account/db-load-account-by-id-or-email'
import { type LoadAccountByIdOrEmailRepository } from '@/domain/protocols/infra/db'
import { mockAccountModel } from '../../../helper/mock-account-model'

interface SutTypes {
  sut: DbLoadAccountByIdOrEmail
  loadAccountByIdOrEmailRepositoryStub: LoadAccountByIdOrEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByIdOrEmailRepositoryStub =
    makeLoadAccountByIdOrEmailRepositoryStub(mockAccountModel)
  const sut = new DbLoadAccountByIdOrEmail(loadAccountByIdOrEmailRepositoryStub)

  return {
    sut,
    loadAccountByIdOrEmailRepositoryStub,
  }
}

describe('DbLoadAccountByIdOrEmail', () => {
  test('should call LoadAccountByIdOrEmailRepository with correct id or email', async () => {
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    const loadByIdOrEmailSpy = jest.spyOn(
      loadAccountByIdOrEmailRepositoryStub,
      'load',
    )
    await sut.loadByIdOrEmail('any_id')
    expect(loadByIdOrEmailSpy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if LoadAccountByIdOrEmailRepository returns null', async () => {
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
      .mockResolvedValueOnce(null)
    const response = sut.loadByIdOrEmail('any_id')
    await expect(response).rejects.toThrow(
      new NotExistsRegister('This services not exists'),
    )
  })

  test('should throw if LoadAccountByIdOrEmailRepository throws', async () => {
    const error = new Error()
    const { sut, loadAccountByIdOrEmailRepositoryStub } = makeSut()
    jest
      .spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
      .mockRejectedValueOnce(error)
    const response = sut.loadByIdOrEmail('any_id')
    await expect(response).rejects.toThrow(error)
  })

  test('should return AccountModel on success', async () => {
    const { sut } = makeSut()
    const response = await sut.loadByIdOrEmail('any_id')
    expect(response).toEqual(mockAccountModel)
    expect(response?.password).toBeFalsy()
  })
})
