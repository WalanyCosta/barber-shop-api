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

  test('should return 500 if loadByIdOrEmail throws', async () => {
    const id = 'any_id'
    const error = new Error()
    const loadAccountByIdOrEmailStub = makeLoadAccountByIdOrEmailStub()
    const sut = new LoadAccountByIdController(loadAccountByIdOrEmailStub)
    jest.spyOn(loadAccountByIdOrEmailStub, 'loadByIdOrEmail').mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        id
      }
    })
    expect(response).toEqual({
      statusCode: 500,
      body: error
    })
  })
})
