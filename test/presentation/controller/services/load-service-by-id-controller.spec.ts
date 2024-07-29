import { type LoadServiceById } from '@/domain/protocols/presentation/service/load-service-by-id'
import { fakeResponseService, makeLoadServiceByIdStub } from '../../mocks'
import { LoadServiceByIdController } from '@/presentation/controller'

interface SutType {
  sut: LoadServiceByIdController
  loadServiceByIdStub: LoadServiceById
}

const makeSut = (): SutType => {
  const loadServiceByIdStub = makeLoadServiceByIdStub()
  const sut = new LoadServiceByIdController(loadServiceByIdStub)

  return {
    sut,
    loadServiceByIdStub
  }
}

describe('LoadServiceByIdController', () => {
  test('should call loadById with correct params', async () => {
    const serviceId = 'any_id'
    const { sut, loadServiceByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadServiceByIdStub, 'loadById')
    await sut.handle({
      params: {
        id: serviceId
      }
    })
    expect(loadByIdSpy).toHaveBeenCalledWith(serviceId)
  })

  test('should return 400 if loadById returns null', async () => {
    const serviceId = 'old_id'
    const { sut, loadServiceByIdStub } = makeSut()
    jest.spyOn(loadServiceByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.handle({
      params: {
        id: serviceId
      }
    })
    expect(response).toEqual({
      statusCode: 400,
      body: {
        error: 'Serviço não encontrado!'
      }
    })
  })

  test('should return 500 if loadById throws', async () => {
    const serviceId = 'any_id'
    const error = new Error()
    const { sut, loadServiceByIdStub } = makeSut()
    jest.spyOn(loadServiceByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const response = await sut.handle({
      params: {
        id: serviceId
      }
    })
    expect(response).toEqual({
      statusCode: 500,
      body: {
        error
      }
    })
  })

  test('should return 200 on success', async () => {
    const serviceId = 'any_id'
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        id: serviceId
      }
    })
    expect(response).toEqual({
      statusCode: 200,
      body: fakeResponseService
    })
  })
})
