import { makeSearchServicesStub } from '../../mocks'
import { SearchServicesController } from '@/presentation/controller'

describe('SearchServicesController', () => {
  test('should call filter with correct params', async () => {
    const searchServiceStub = makeSearchServicesStub()
    const sut = new SearchServicesController(searchServiceStub)
    const filterSpy = jest.spyOn(searchServiceStub, 'filter')
    await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query'
      }
    })
    expect(filterSpy).toHaveBeenCalledWith('service', 'any_query')
  })

  test('should return 200 if filter returns empty array', async () => {
    const searchServiceStub = makeSearchServicesStub()
    const sut = new SearchServicesController(searchServiceStub)
    jest.spyOn(searchServiceStub, 'filter').mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query'
      }
    })
    expect(response).toEqual({
      statusCode: 200,
      body: []
    })
  })
})
