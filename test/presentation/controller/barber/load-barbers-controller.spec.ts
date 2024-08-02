import { type LoadBarbers } from '@/domain/protocols/presentation/barber/load-barbers'
import { LoadBarbersController } from '@/presentation/controller'
import { makeLoadBarbersStub } from '../../mocks/mock-barber'

interface SutTypes {
  sut: LoadBarbersController
  loadBarbersStub: LoadBarbers
}

const makeSut = (): SutTypes => {
  const loadBarbersStub = makeLoadBarbersStub()
  const sut = new LoadBarbersController(loadBarbersStub)

  return {
    sut,
    loadBarbersStub,
  }
}

describe('LoadBarbersController', () => {
  test('should call LoadBarbers', async () => {
    const { sut, loadBarbersStub } = makeSut()
    const loadSpy = jest.spyOn(loadBarbersStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })
})
