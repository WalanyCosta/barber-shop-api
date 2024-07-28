import { NotExistsRegister } from '@/presentation/errors'
import { makeLoadAccountByIdOrEmailRepositoryStub, mockAccountModel } from '../../mock/mock-account'
import { DbLoadAccountByIdOrEmail } from '@/domain/usecase/account/db-load-account-by-id-or-email'

describe('DbLoadAccountByIdOrEmail', () => {
  test('should call LoadAccountByIdOrEmailRepository with correct id or email', async () => {
    const loadAccountByIdOrEmailRepositoryStub = makeLoadAccountByIdOrEmailRepositoryStub(mockAccountModel)
    const sut = new DbLoadAccountByIdOrEmail(loadAccountByIdOrEmailRepositoryStub)
    const loadByIdOrEmailSpy = jest.spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
    await sut.loadByIdOrEmail('any_id')
    expect(loadByIdOrEmailSpy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if LoadAccountByIdOrEmailRepository returns null', async () => {
    const loadAccountByIdOrEmailRepositoryStub = makeLoadAccountByIdOrEmailRepositoryStub(mockAccountModel)
    const sut = new DbLoadAccountByIdOrEmail(loadAccountByIdOrEmailRepositoryStub)
    jest.spyOn(loadAccountByIdOrEmailRepositoryStub, 'load').mockResolvedValueOnce(null)
    const response = sut.loadByIdOrEmail('any_id')
    await expect(response).rejects.toThrow(new NotExistsRegister('This services not exists'))
  })

  test('should throw if LoadAccountByIdOrEmailRepository throws', async () => {
    const error = new Error()
    const loadAccountByIdOrEmailRepositoryStub = makeLoadAccountByIdOrEmailRepositoryStub(mockAccountModel)
    const sut = new DbLoadAccountByIdOrEmail(loadAccountByIdOrEmailRepositoryStub)
    jest.spyOn(loadAccountByIdOrEmailRepositoryStub, 'load').mockRejectedValueOnce(error)
    const response = sut.loadByIdOrEmail('any_id')
    await expect(response).rejects.toThrow(error)
  })

  test('should return AccountModel on success', async () => {
    const loadAccountByIdOrEmailRepositoryStub = makeLoadAccountByIdOrEmailRepositoryStub(mockAccountModel)
    const sut = new DbLoadAccountByIdOrEmail(loadAccountByIdOrEmailRepositoryStub)
    const response = await sut.loadByIdOrEmail('any_id')
    expect(response).toEqual(mockAccountModel)
    expect(response?.password).toBeFalsy()
  })
})
