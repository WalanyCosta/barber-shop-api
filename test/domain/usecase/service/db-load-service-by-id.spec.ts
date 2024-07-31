import { type LoadServiceById } from '@/domain/protocols/presentation/service/load-service-by-id'
import { DbLoadServiceById } from '@/domain/usecase/service/db-load-service-by-id'
import { makeLoadServiceByIdRepositoryStub } from '../../mock/mock-service'
import { mockServiceModel } from '../../../helper/mock-service-model'

interface SutTypes {
  sut: DbLoadServiceById
  loadServiceByIdRepositoryStub: LoadServiceById
}

const makeSut = (): SutTypes => {
  const loadServiceByIdRepositoryStub = makeLoadServiceByIdRepositoryStub()
  const sut = new DbLoadServiceById(loadServiceByIdRepositoryStub)

  return {
    sut,
    loadServiceByIdRepositoryStub,
  }
}

describe('DbLoadServiceById', () => {
  test('should call loadById with correct serviceId', async () => {
    const serviceId = 'any_id'
    const { sut, loadServiceByIdRepositoryStub } = makeSut()
    const loadById = jest.spyOn(loadServiceByIdRepositoryStub, 'loadById')
    await sut.loadById(serviceId)
    expect(loadById).toHaveBeenCalledWith(serviceId)
  })

  test('should return null if loadById return empty', async () => {
    const { sut, loadServiceByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadServiceByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.loadById('any_id')
    expect(response).toBe(null)
  })

  test('should throw if loadById throws', async () => {
    const { sut, loadServiceByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadServiceByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error())
    const error = sut.loadById('any_id')
    expect(error).rejects.toThrow()
  })

  test('should return service on success', async () => {
    const { sut } = makeSut()
    const response = await sut.loadById('any_id')
    expect(response).toEqual(mockServiceModel)
  })
})
