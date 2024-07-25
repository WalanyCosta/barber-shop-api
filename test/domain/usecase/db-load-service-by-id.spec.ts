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

  test('should return null if loadById return empty', async () => {
    const serviceId = 'any_id'
    const loadServiceByIdRepositoryStub = makeLoadServiceByIdRepositoryStub()
    const sut = new DbLoadServiceById(loadServiceByIdRepositoryStub)
    jest.spyOn(loadServiceByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.loadById(serviceId)
    expect(response).toBe(null)
  })

  test('should throw if loadById throws', async () => {
    const serviceId = 'any_id'
    const loadServiceByIdRepositoryStub = makeLoadServiceByIdRepositoryStub()
    const sut = new DbLoadServiceById(loadServiceByIdRepositoryStub)
    jest.spyOn(loadServiceByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error())
    const error = sut.loadById(serviceId)
    expect(error).rejects.toThrow()
  })
})
