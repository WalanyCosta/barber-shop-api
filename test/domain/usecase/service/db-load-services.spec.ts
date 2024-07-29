import { DbLoadServices } from '@/domain/usecase/service'
import { type LoadServicesRepository } from '@/domain/protocols/infra/db'
import { type ServiceModel } from '@/domain/model/service-model'
import { mockArrayServiceModel } from '../../mock/mock-service'

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

const makeLoadServicesRepository = (): LoadServicesRepository => {
  class LoadServicesRepositoryStub implements LoadServicesRepository {
    async load (): Promise<ServiceModel[]> {
      return await Promise.resolve(mockArrayServiceModel)
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
    expect(services).toEqual(mockArrayServiceModel)
  })
})
