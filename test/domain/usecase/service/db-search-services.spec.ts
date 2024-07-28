import { type SearchServicesRepository } from '@/domain/protocols/infra/db/services/search-services-repository'
import { makeSearchServicesRepositoryStub, mockServices } from '../../mock/mock-service'
import { DbSearchServices } from '@/domain/usecase/service/db-search-services'

interface SutTypes {
  sut: DbSearchServices
  searchServicesRepositoryStub: SearchServicesRepository
}

const makeSut = (): SutTypes => {
  const searchServicesRepositoryStub = makeSearchServicesRepositoryStub()
  const sut = new DbSearchServices(searchServicesRepositoryStub)

  return {
    sut,
    searchServicesRepositoryStub
  }
}

describe('DbSearchServices', () => {
  test('should call filter with correct params', async () => {
    const typeQuery = 'service'
    const query = 'any_service'
    const { sut, searchServicesRepositoryStub } = makeSut()
    const filterSpy = jest.spyOn(searchServicesRepositoryStub, 'filter')
    await sut.filter(typeQuery, query)
    expect(filterSpy).toHaveBeenCalledWith(typeQuery, query)
  })

  test('should throws if filter throws', async () => {
    const { sut, searchServicesRepositoryStub } = makeSut()
    jest.spyOn(searchServicesRepositoryStub, 'filter').mockRejectedValueOnce(new Error())
    const error = sut.filter('service', 'any_service')
    expect(error).rejects.toThrow()
  })

  test('should return ServiceModel array on success', async () => {
    const { sut } = makeSut()
    const response = await sut.filter('service', 'any_service')
    expect(response).toBe(mockServices)
  })
})
