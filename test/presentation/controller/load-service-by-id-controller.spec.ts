import { makeLoadServiceByIdStub } from '../mocks/mock-services'
import { LoadServiceByIdController } from '@/presentation/controller/services/load-service-by-id-controller'

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
})
