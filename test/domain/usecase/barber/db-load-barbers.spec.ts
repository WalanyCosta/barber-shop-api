import { type LoadBarbersRepository } from '@/domain/protocols/infra/db'
import { DbLoadBarbers } from '@/domain/usecase'
import { makeLoadBarbersRepositoryStub } from '../../mock/mock-barber'
import { StatusBarber } from '@/domain/model/barber-model'

interface SutTypes {
  sut: DbLoadBarbers
  loadBarbersRepositoryStub: LoadBarbersRepository
}

const makeSut = (): SutTypes => {
  const loadBarbersRepositoryStub = makeLoadBarbersRepositoryStub()
  const sut = new DbLoadBarbers(loadBarbersRepositoryStub)

  return {
    sut,
    loadBarbersRepositoryStub,
  }
}

describe('DbLoadBarbers', () => {
  test('should call LoadBarbersRepository with correct status', async () => {
    const { sut, loadBarbersRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadBarbersRepositoryStub, 'load')
    await sut.load()
    expect(loadSpy).toHaveBeenCalledWith(StatusBarber.active)
  })

  test('should throw if LoadBarbersRepository throws', async () => {
    const error = new Error()
    const { sut, loadBarbersRepositoryStub } = makeSut()
    jest.spyOn(loadBarbersRepositoryStub, 'load').mockRejectedValueOnce(error)
    const response = sut.load()
    expect(response).rejects.toThrow()
  })
})
