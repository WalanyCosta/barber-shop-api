import { type LoadBarberByIdRepository } from '@/domain/protocols/infra/db'
import { DbLoadBarberById } from '@/domain/usecase'
import { makeLoadBarberByIdRepositoryStub } from '../../mock/mock-barber'

interface SutTypes {
  sut: DbLoadBarberById
  loadBarberByIdRepositoryStub: LoadBarberByIdRepository
}

const makeSut = (): SutTypes => {
  const loadBarberByIdRepositoryStub = makeLoadBarberByIdRepositoryStub()
  const sut = new DbLoadBarberById(loadBarberByIdRepositoryStub)

  return {
    sut,
    loadBarberByIdRepositoryStub
  }
}

describe('DbLoadBarberById', () => {
  test('should call LoadBarberByIdRepository with correct id', async () => {
    const id = 'any_id'
    const { sut, loadBarberByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBarberByIdRepositoryStub, 'loadById')
    await sut.loadById(id)
    expect(loadByIdSpy).toHaveBeenCalledWith(id)
  })
})
