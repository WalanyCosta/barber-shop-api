import { NotExistsRegister } from '@/presentation/errors'
import { makeLoadAccountByIdOrEmailStub } from '../../mocks'
import { LoadAccountByIdController } from '@/presentation/controller/'
import { type LoadAccountByIdOrEmail } from '@/domain/protocols/presentation/account/load-account-by-id'

interface SutTypes {
  sut: LoadAccountByIdController
  loadAccountByIdOrEmailStub: LoadAccountByIdOrEmail
}
const makeSut = (): SutTypes => {
  const loadAccountByIdOrEmailStub = makeLoadAccountByIdOrEmailStub()
  const sut = new LoadAccountByIdController(loadAccountByIdOrEmailStub)

  return {
    sut,
    loadAccountByIdOrEmailStub
  }
}

describe('LoadAccountByIdController', () => {
  test('should call loadByIdOrEmail with correct params', async () => {
    const userId = 'any_id'
    const { sut, loadAccountByIdOrEmailStub } = makeSut()
    const loadByIdOrEmail = jest.spyOn(loadAccountByIdOrEmailStub, 'loadByIdOrEmail')
    await sut.handle({
      params: {
        userId
      }
    })
    expect(loadByIdOrEmail).toHaveBeenCalledWith(userId)
  })

  test('should return 500 if loadByIdOrEmail throws', async () => {
    const error = new Error()
    const { sut, loadAccountByIdOrEmailStub } = makeSut()
    jest.spyOn(loadAccountByIdOrEmailStub, 'loadByIdOrEmail').mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        userId: 'any_id'
      }
    })
    expect(response).toEqual({
      statusCode: 500,
      body: error
    })
  })

  test('should return 400 if loadByIdOrEmail throws', async () => {
    const error = new NotExistsRegister('This services not exists')
    const { sut, loadAccountByIdOrEmailStub } = makeSut()
    jest.spyOn(loadAccountByIdOrEmailStub, 'loadByIdOrEmail').mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        userId: 'other_id'
      }
    })
    expect(response).toEqual({
      statusCode: 400,
      body: error
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        userId: 'any_id'
      }
    })
    expect(response).toEqual({
      statusCode: 200,
      body: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        password: 'hashed',
        phone: 'any_phone',
        accessToken: 'any_value'
      }
    })
  })
})
