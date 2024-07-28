import { makeLoadAccountByIdOrEmailStub } from '../../mocks'
import { LoadAccountByIdController } from '@/presentation/controller/'

describe('LoadAccountByIdController', () => {
  test('should call loadByIdOrEmail with correct params', async () => {
    const id = 'any_id'
    const loadAccountByIdOrEmailStub = makeLoadAccountByIdOrEmailStub()
    const sut = new LoadAccountByIdController(loadAccountByIdOrEmailStub)
    const loadByIdOrEmail = jest.spyOn(loadAccountByIdOrEmailStub, 'loadByIdOrEmail')
    await sut.handle({
      params: {
        id
      }
    })
    expect(loadByIdOrEmail).toHaveBeenCalledWith(id)
  })
})
