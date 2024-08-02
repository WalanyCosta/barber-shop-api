import { LoadCategoryByIdController } from '@/presentation/controller'
import { type LoadCategoryById } from '@/domain/protocols/presentation'
import { makeLoadCategoryByIdStub } from '../../mocks/mock-category'
import { NotExistsRegister } from '@/presentation/errors'
import { mockCategoryModel } from '../../../helpers/mock-category-model'

interface SutTypes {
  sut: LoadCategoryByIdController
  loadCategoryByIdStub: LoadCategoryById
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdStub = makeLoadCategoryByIdStub()
  const sut = new LoadCategoryByIdController(loadCategoryByIdStub)

  return {
    sut,
    loadCategoryByIdStub,
  }
}

describe('LoadCategoriesController', () => {
  test('should call loadById with correct id', async () => {
    const { sut, loadCategoryByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadCategoryByIdStub, 'loadById')
    await sut.handle({
      params: {
        id: 'any_id',
      },
    })
    expect(loadByIdSpy).toHaveBeenCalled()
  })

  test('should return 400 if loadById throws notExistsRegister', async () => {
    const { sut, loadCategoryByIdStub } = makeSut()
    const error = new NotExistsRegister('not exists register with id')
    jest.spyOn(loadCategoryByIdStub, 'loadById').mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        id: 'any_id',
      },
    })
    expect(response).toEqual({
      statusCode: 400,
      body: error,
    })
  })

  test('should return 500 if loadById throws', async () => {
    const { sut, loadCategoryByIdStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadCategoryByIdStub, 'loadById').mockRejectedValueOnce(error)
    const response = await sut.handle({
      params: {
        id: 'any_id',
      },
    })
    expect(response).toEqual({
      statusCode: 500,
      body: error,
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      params: {
        id: 'any_id',
      },
    })
    expect(response).toEqual({
      statusCode: 200,
      body: mockCategoryModel,
    })
  })
})
