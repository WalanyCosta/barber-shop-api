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
})
