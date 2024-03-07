import { LoadServicesController } from './../../../src/presentation/controller/load-services-controller'
import { type LoadServices } from './../../../src/domain/protocols/presentation/load-services'
import { type ServiceModel, StatusService } from './../../../src/domain/model/service-model'

class LoadServicesStub implements LoadServices {
  async load (): Promise<ServiceModel[] | null> {
    return await Promise.resolve([{
      id: 'any_id',
      name: 'any_name',
      price: 30,
      star: 5,
      status: StatusService.active,
      category: 'any_category'
    }])
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

  test('should return 204 if LoadServices returns null', async () => {
    const loadServicesStub = new LoadServicesStub()
    const sut = new LoadServicesController(loadServicesStub)
    jest.spyOn(loadServicesStub, 'load').mockResolvedValue(null)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 204,
      body: []
    })
  })
})
