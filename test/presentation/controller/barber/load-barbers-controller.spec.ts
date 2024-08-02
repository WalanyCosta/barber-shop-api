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

  test('should return 500 if LoadBarbers throws', async () => {
    const error = new Error()
    const { sut, loadBarbersStub } = makeSut()
    jest.spyOn(loadBarbersStub, 'load').mockRejectedValueOnce(error)
    const response = await sut.handle({})
    expect(response).toEqual({
      statusCode: 500,
      body: error,
    })
  })
})
