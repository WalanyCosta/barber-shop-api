import { LoadServicesController } from './../../../src/presentation/controller/load-services-controller'
import { type LoadServices } from './../../../src/domain/protocols/presentation/load-services'
import { type ServiceModel, StatusService } from './../../../src/domain/model/service-model'

class LoadServicesStub implements LoadServices {
  async load (): Promise<ServiceModel> {
    return await Promise.resolve({
      id: 'any_id',
      name: 'any_name',
      price: 30,
      star: 5,
      status: StatusService.active,
      category: 'any_category'
    })
  }
}

describe('LoadServicesController', () => {
  test('should call LoadServices', async () => {
    const loadServicesStub = new LoadServicesStub()
    const sut = new LoadServicesController(loadServicesStub)
    const loadSpy = jest.spyOn(loadServicesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
