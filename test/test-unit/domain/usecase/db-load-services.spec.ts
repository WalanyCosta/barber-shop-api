import { DbLoadServices } from './../../../../src/domain/usecase/load-services-repository'
import { type LoadServicesRepository } from './../../../../src/domain/protocols/infra/db/load-service-repository'
import { type ServiceModel } from '../../../../src/domain/model/service-model'

interface SutTypes {
  sut: DbLoadServices
  loadServicesRepositoryStub: LoadServicesRepository
}

const makeSut = (): SutTypes => {
  const loadServicesRepositoryStub = makeLoadServicesRepository()
  const sut = new DbLoadServices(loadServicesRepositoryStub)

  return {
    sut,
    loadServicesRepositoryStub
  }
}

const fakeServicesResponse = ([
  {
    id: 'any_id',
    name: 'any_name',
    price: 30,
    star: 5,
    status: 'active',
    category: 'any_category'
  },
  {
    id: 'other_id',
    name: 'other_name',
    price: 20,
    star: 3,
    status: 'disable',
    category: 'other_category'
  }
] as ServiceModel[])

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
    const { sut, loadServicesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadServicesRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return empty array LoadServicesRepository returns empty', async () => {
    const { sut, loadServicesRepositoryStub } = makeSut()
    jest.spyOn(loadServicesRepositoryStub, 'load').mockResolvedValueOnce([])
    const services = await sut.load()
    expect(services).toEqual([])
  })

  test('should throw LoadServicesRepository throws', async () => {
    const { sut, loadServicesRepositoryStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadServicesRepositoryStub, 'load').mockRejectedValueOnce(error)
    const promise = sut.load()
    await expect(promise).rejects.toThrow(error)
  })

  test('should return services on success', async () => {
    const { sut } = makeSut()
    const services = await sut.load()
    expect(services).toEqual(fakeServicesResponse)
  })
})
