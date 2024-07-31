import { LoadCategoriesController } from '@/presentation/controller'
import { type LoadCategories } from '@/domain/protocols/presentation'
import { makeLoadCategoriesStub } from '../../mocks/mock-category'
import { mockArrayCategoryModel } from '../../../helper/mock-category-model'

interface SutTypes {
  sut: LoadCategoriesController
  loadCategoriesStub: LoadCategories
}

const makeSut = (): SutTypes => {
  const loadCategoriesStub = makeLoadCategoriesStub()
  const sut = new LoadCategoriesController(loadCategoriesStub)

  return {
    sut,
    loadCategoriesStub,
  }
}

describe('LoadCategoriesController', () => {
  test('should call LoadCategories', async () => {
    const { sut, loadCategoriesStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoriesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 500 if LoadCategories throws', async () => {
    const { sut, loadCategoriesStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadCategoriesStub, 'load').mockRejectedValueOnce(error)
    const response = await sut.handle({})
    expect(response).toEqual({
      statusCode: 500,
      body: error,
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual({
      statusCode: 200,
      body: mockArrayCategoryModel,
    })
  })
})
