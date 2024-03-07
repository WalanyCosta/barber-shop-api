import { LoadServicesController } from './../../../src/presentation/controller/load-services-controller'
import { type LoadServices } from './../../../src/domain/protocols/presentation/load-services'
import { type ServiceModel, StatusService } from './../../../src/domain/model/service-model'

interface SutTypes {
  sut: LoadServicesController
  loadServicesStub: LoadServices
}

const makeSut = (): SutTypes => {
  const loadServicesStub = makeLoadServicesStub()
  const sut = new LoadServicesController(loadServicesStub)

  return {
    sut,
    loadServicesStub
  }
}

const fakeServicesResponse = ([
  {
    id: 'any_id',
    name: 'any_name',
    price: 30,
    star: 5,
    status: StatusService.active,
    category: 'any_category'
  },
  {
    id: 'other_id',
    name: 'other_name',
    price: 20,
    star: 3,
    status: StatusService.disable,
    category: 'other_category'
  }
])

const makeLoadServicesStub = (): LoadServices => {
  class LoadServicesStub implements LoadServices {
    async load (): Promise<ServiceModel[] | null> {
      return await Promise.resolve(fakeServicesResponse)
    }
  }

  return new LoadServicesStub()
}

describe('LoadServicesController', () => {
  test('should call LoadServices', async () => {
    const { sut, loadServicesStub } = makeSut()
    const loadSpy = jest.spyOn(loadServicesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 204 if LoadServices returns null', async () => {
    const { sut, loadServicesStub } = makeSut()
    jest.spyOn(loadServicesStub, 'load').mockResolvedValue(null)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 204,
      body: []
    })
  })

  test('should return 500 if LoadServices throws', async () => {
    const { sut, loadServicesStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadServicesStub, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: error
    })
  })

  test('should return 500 if LoadServices throws', async () => {
    const { sut, loadServicesStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadServicesStub, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: error
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: fakeServicesResponse
    })
  })
})
