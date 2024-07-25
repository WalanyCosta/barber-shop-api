import { DbLoadServiceById } from '@/domain/usecase/db-load-service-by-id'
import { makeLoadServiceByIdRepositoryStub } from '../mock/mock-service'

describe('DbLoadServiceById', () => {
  test('should call loadById with correct serviceId', async () => {
    const serviceId = 'any_id'
    const loadServiceByIdRepositoryStub = makeLoadServiceByIdRepositoryStub()
    const sut = new DbLoadServiceById(loadServiceByIdRepositoryStub)
    const loadById = jest.spyOn(loadServiceByIdRepositoryStub, 'loadById')
    await sut.loadById(serviceId)
    expect(loadById).toHaveBeenCalledWith(serviceId)
  })
})
