import { DbLoadServices } from './../../../../src/domain/usecase/load-services-repository'
import { type LoadServicesRepository } from './../../../../src/domain/protocols/infra/db/load-service-repository'
import { StatusService, type ServiceModel } from '../../../../src/domain/model/service-model'

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

const makeLoadServicesRepository = (): LoadServicesRepository => {
  class LoadServicesRepositoryStub implements LoadServicesRepository {
    async load (): Promise<ServiceModel[]> {
      return await Promise.resolve(fakeServicesResponse)
    }
  }

  return new LoadServicesRepositoryStub()
}

describe('DbLoadServices', () => {
  test('should call LoadServicesRepository', async () => {
    const loadServicesRepositoryStub = makeLoadServicesRepository()
    const sut = new DbLoadServices(loadServicesRepositoryStub)
    const loadSpy = jest.spyOn(loadServicesRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return empty LoadServicesRepository returns null', async () => {
    const loadServicesRepositoryStub = makeLoadServicesRepository()
    const sut = new DbLoadServices(loadServicesRepositoryStub)
    jest.spyOn(loadServicesRepositoryStub, 'load').mockResolvedValueOnce([])
    const services = await sut.load()
    expect(services).toBe(null)
  })

  test('should throw LoadServicesRepository throws', async () => {
    const loadServicesRepositoryStub = makeLoadServicesRepository()
    const sut = new DbLoadServices(loadServicesRepositoryStub)
    const error = new Error()
    jest.spyOn(loadServicesRepositoryStub, 'load').mockRejectedValueOnce(error)
    const promise = sut.load()
    await expect(promise).rejects.toThrow(error)
  })

  test('should return services on success', async () => {
    const loadServicesRepositoryStub = makeLoadServicesRepository()
    const sut = new DbLoadServices(loadServicesRepositoryStub)
    const services = await sut.load()
    expect(services).toEqual(fakeServicesResponse)
  })
})
