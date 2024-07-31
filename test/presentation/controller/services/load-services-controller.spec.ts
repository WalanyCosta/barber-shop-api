import { LoadServicesController } from '@/presentation/controller'
import { type LoadServices } from '@/domain/protocols/presentation'
import { makeLoadServicesStub } from '../../mocks'
import { mockArrayServiceModel } from '../../../helper/mock-service-model'

interface SutTypes {
  sut: LoadServicesController
  loadServicesStub: LoadServices
}

const makeSut = (): SutTypes => {
  const loadServicesStub = makeLoadServicesStub()
  const sut = new LoadServicesController(loadServicesStub)

  return {
    sut,
    loadServicesStub,
  }
}

describe('LoadServicesController', () => {
  test('should call LoadServices', async () => {
    const { sut, loadServicesStub } = makeSut()
    const loadSpy = jest.spyOn(loadServicesStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 204 if LoadServices returns empty array', async () => {
    const { sut, loadServicesStub } = makeSut()
    jest.spyOn(loadServicesStub, 'load').mockResolvedValue([])
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 204,
      body: [],
    })
  })

  test('should return 500 if LoadServices throws', async () => {
    const { sut, loadServicesStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadServicesStub, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: error,
    })
  })

  test('should return 500 if LoadServices throws', async () => {
    const { sut, loadServicesStub } = makeSut()
    const error = new Error()
    jest.spyOn(loadServicesStub, 'load').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: error,
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: mockArrayServiceModel,
    })
  })
})
