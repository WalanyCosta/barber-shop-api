import { makeSearchServicesRepositoryStub } from '../../mock/mock-service'
import { DbSearchServices } from '@/domain/usecase/service/db-search-services'

describe('DbSearchServices', () => {
  test('should call filter with correct params', async () => {
    const searchServicesRepositoryStub = makeSearchServicesRepositoryStub()
    const sut = new DbSearchServices(searchServicesRepositoryStub)
    const typeQuery = 'service'
    const query = 'any_service'
    const filterSpy = jest.spyOn(searchServicesRepositoryStub, 'filter')
    await sut.filter(typeQuery, query)
    expect(filterSpy).toHaveBeenCalledWith(typeQuery, query)
  })

  test('should throws if filter throws', async () => {
    const searchServicesRepositoryStub = makeSearchServicesRepositoryStub()
    const sut = new DbSearchServices(searchServicesRepositoryStub)
    const typeQuery = 'service'
    const query = 'any_service'
    jest.spyOn(searchServicesRepositoryStub, 'filter').mockRejectedValueOnce(new Error())
    const error = sut.filter(typeQuery, query)
    expect(error).rejects.toThrow()
  })
})
