import { DbLoadCategoryById } from '@/domain/usecase'
import { makeLoadCategoryByIdRepositoryStub } from '../../mock/mock-category'
import { type LoadCategoryByIdRepository } from '@/domain/protocols/infra/db/category/load-category-by-id-repository'

interface SutTypes {
  sut: DbLoadCategoryById
  loadCategoryByIdRepositoryStub: LoadCategoryByIdRepository
}

const makeSut = (): SutTypes => {
  const loadCategoryByIdRepositoryStub = makeLoadCategoryByIdRepositoryStub()
  const sut = new DbLoadCategoryById(loadCategoryByIdRepositoryStub)

  return {
    sut,
    loadCategoryByIdRepositoryStub
  }
}

describe('DbLoadCategories', () => {
  test('should call LoadCategoryByIdRepository with correct id', async () => {
    const id = 'any_id'
    const { sut, loadCategoryByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoryByIdRepositoryStub, 'loadById')
    await sut.loadById(id)
    expect(loadSpy).toHaveBeenCalledWith(id)
  })

  test('should throw if LoadCategoryByIdRepository throws NotExistsRegister', async () => {
    const id = 'any_id'
    const { sut, loadCategoryByIdRepositoryStub } = makeSut()
    jest.spyOn(loadCategoryByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const response = sut.loadById(id)
    await expect(response).rejects.toThrow()
  })
})
