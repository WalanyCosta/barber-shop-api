import { makeLoadAccountByIdOrEmailRepositoryStub } from '../../mock/mock-account'
import { DbLoadAccountByIdOrEmail } from '@/domain/usecase/account/db-load-account-by-id-or-email'

describe('DbLoadAccountByIdOrEmail', () => {
  test('should call LoadAccountByIdOrEmailRepository with correct id or email', async () => {
    const loadAccountByIdOrEmailRepositoryStub = makeLoadAccountByIdOrEmailRepositoryStub()
    const sut = new DbLoadAccountByIdOrEmail(loadAccountByIdOrEmailRepositoryStub)
    const loadByIdOrEmailSpy = jest.spyOn(loadAccountByIdOrEmailRepositoryStub, 'load')
    await sut.loadByIdOrEmail('any_id')
    expect(loadByIdOrEmailSpy).toHaveBeenCalledWith('any_id')
  })
})
