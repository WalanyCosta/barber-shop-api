import { DbLoadCategoryById } from '@/domain/usecase'
import { makeLoadCategoryByIdRepositoryStub } from '../../mock/mock-category'
import { type LoadCategoryByIdRepository } from '@/domain/protocols/infra/db/category/load-category-by-id-repository'
import { mockCategoryModel } from '../../../helpers/mock-category-model'

interface SutTypes {
  sut: DbLoadCategoryById
  loadCategoryByIdRepositoryStub: LoadCategoryByIdRepository
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdRepositoryStub = makeLoadCategoryByIdRepositoryStub()
  const sut = new DbLoadCategoryById(loadCategoryByIdRepositoryStub)

  return {
    sut,
    loadCategoryByIdRepositoryStub,
  }
}

describe('DbLoadCategoryById', () => {
  test('should call LoadCategoryByIdRepository with correct id', async () => {
    const id = 'any_id'
    const { sut, loadCategoryByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoryByIdRepositoryStub, 'loadById')
    await sut.loadById(id)
    expect(loadSpy).toHaveBeenCalledWith(id)
  })

  test('should throw if LoadCategoryByIdRepository throws NotExistsRegister', async () => {
    const { sut, loadCategoryByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadCategoryByIdRepositoryStub, 'loadById')
      .mockResolvedValueOnce(null)
    const response = sut.loadById('any_id')
    await expect(response).rejects.toThrow()
  })

  test('should throw if LoadCategoryByIdRepository throws', async () => {
    const { sut, loadCategoryByIdRepositoryStub } = makeSut()
    jest
      .spyOn(loadCategoryByIdRepositoryStub, 'loadById')
      .mockRejectedValueOnce(new Error())
    const response = sut.loadById('any_id')
    await expect(response).rejects.toThrow()
  })

  test('should return category on success', async () => {
    const { sut } = makeSut()
    const response = await sut.loadById('any_id')
    expect(response).toEqual(mockCategoryModel)
  })
})
