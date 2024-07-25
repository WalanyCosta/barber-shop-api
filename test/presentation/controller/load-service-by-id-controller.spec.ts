import { makeLoadServiceByIdStub } from '../mocks'
import { LoadServiceByIdController } from '@/presentation/controller'

describe('LoadServiceByIdController', () => {
  test('should call loadById with correct params', async () => {
    const serviceId = 'any_id'
    const loadServiceByIdStub = makeLoadServiceByIdStub()
    const sut = new LoadServiceByIdController(loadServiceByIdStub)
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
    const loadServiceByIdStub = makeLoadServiceByIdStub()
    const sut = new LoadServiceByIdController(loadServiceByIdStub)
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
    const loadServiceByIdStub = makeLoadServiceByIdStub()
    const error = new Error()
    const sut = new LoadServiceByIdController(loadServiceByIdStub)
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
})
