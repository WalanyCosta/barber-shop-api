import { type LoadBarberById } from '@/domain/protocols/presentation/barber'
import { LoadBarberByIdController } from '@/presentation/controller'
import { makeLoadBarberByIdStub } from '../../mocks/mock-barber'
import { NotExistsRegister } from '@/presentation/errors'

interface SutTypes {
  sut: LoadBarberByIdController
  loadBarberByIdStub: LoadBarberById
}

const makeSut = (): SutTypes => {
  const loadBarberByIdStub = makeLoadBarberByIdStub()
  const sut = new LoadBarberByIdController(loadBarberByIdStub)

  return {
    sut,
    loadBarberByIdStub
  }
}

describe('LoadBarberByIdController', () => {
  test('should call LoadBarberById with correct id', async () => {
    const { sut, loadBarberByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBarberByIdStub, 'loadById')
    await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(loadByIdSpy).toHaveBeenCalled()
  })

  test('should return 400 if LoadBarberById throws NotExistsRegister', async () => {
    const error = new NotExistsRegister('Not exists register with id')
    const { sut, loadBarberByIdStub } = makeSut()
    jest.spyOn(loadBarberByIdStub, 'loadById').mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(response).toEqual({
      statusCode: 400,
      body: error
    })
  })

  test('should return 500 if LoadBarberById throws', async () => {
    const error = new Error()
    const { sut, loadBarberByIdStub } = makeSut()
    jest.spyOn(loadBarberByIdStub, 'loadById').mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(response).toEqual({
      statusCode: 500,
      body: error
    })
  })
})
