import { type LoadCategoriesRepository } from '@/domain/protocols/infra/db'
import { DbLoadCategories } from '@/domain/usecase/category'
import { mockArrayCategoryModel } from '../../../helpers/mock-category-model'
import { makeLoadCategoriesRepository } from '../../mock/mock-category'

interface SutTypes {
  sut: DbLoadCategories
  loadCategoriesRepositoryStub: LoadCategoriesRepository
}

const makeSut = (): SutTypes => {
  const loadCategoriesRepositoryStub = makeLoadCategoriesRepository()
  const sut = new DbLoadCategories(loadCategoriesRepositoryStub)

  return {
    sut,
    loadCategoriesRepositoryStub,
  }
}

describe('DbLoadCategories', () => {
  test('should call LoadServicesRepository', async () => {
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoriesRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should throw if LoadServicesRepository throws', async () => {
    const error = new Error()
    const { sut, loadCategoriesRepositoryStub } = makeSut()
    jest
      .spyOn(loadCategoriesRepositoryStub, 'load')
      .mockRejectedValueOnce(error)
    const response = sut.load()
    await expect(response).rejects.toThrow()
  })

  test('should return array of CategoryModel if LoadServicesRepository not throws', async () => {
    const { sut } = makeSut()
    const response = await sut.load()
    expect(response).toEqual(mockArrayCategoryModel)
  })
})
