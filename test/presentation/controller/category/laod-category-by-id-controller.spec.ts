import { LoadCategoryByIdController } from '@/presentation/controller'
import { type LoadCategoryById } from '@/domain/protocols/presentation'
import { makeLoadCategoryByIdStub } from '../../mocks/mock-category'

interface SutTypes {
  sut: LoadCategoryByIdController
  loadCategoryByIdStub: LoadCategoryById
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdStub = makeLoadCategoryByIdStub()
  const sut = new LoadCategoryByIdController(loadCategoryByIdStub)

  return {
    sut,
    loadCategoryByIdStub
  }
}

describe('LoadCategoriesController', () => {
  test('should call loadById with correct id', async () => {
    const { sut, loadCategoryByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadCategoryByIdStub, 'loadById')
    await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(loadByIdSpy).toHaveBeenCalled()
  })
})
