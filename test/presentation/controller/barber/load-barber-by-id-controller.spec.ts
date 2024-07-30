import { type LoadBarberById } from '@/domain/protocols/presentation/barber'
import { LoadBarberByIdController } from '@/presentation/controller'
import { makeLoadBarberByIdStub } from '../../mocks/mock-barber'

interface SutTypes {
  sut: LoadBarberByIdController
  loadBarberByIdStub: LoadBarberById
}

const makeSut = (): SutTypes => {
  const loadBarberByIdStub = makeLoadBarberByIdStub()
  const sut = new LoadBarberByIdController(loadBarberByIdStub)

  return {
    sut,
    loadBarberByIdStub
  }
}

describe('LoadBarberByIdController', () => {
  test('should call LoadBarberById with correct id', async () => {
    const { sut, loadBarberByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBarberByIdStub, 'loadById')
    await sut.handle({
      params: {
        id: 'any_id'
      }
    })
    expect(loadByIdSpy).toHaveBeenCalled()
  })
})
