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
})
