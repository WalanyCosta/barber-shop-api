import { ValidationError } from '@/presentation/errors'
import { makeSearchServicesStub, makeValidatorStub } from '../../mocks'
import { SearchServicesController } from '@/presentation/controller'
import { type Validator } from '@/presentation/protocols/validator'
import { type SearchServices } from '@/domain/protocols/presentation/service/search-service'
import { mockArrayServiceModel } from '../../../helper/mock-service-model'

interface SutTypes {
  sut: SearchServicesController
  validatorStub: Validator
  searchServiceStub: SearchServices
}

const makeSut = (): SutTypes => {
  const searchServiceStub = makeSearchServicesStub()
  const validatorStub = makeValidatorStub()
  const sut = new SearchServicesController(searchServiceStub, validatorStub)

  return {
    sut,
    searchServiceStub,
    validatorStub,
  }
}

describe('SearchServicesController', () => {
  test('should call filter with correct params', async () => {
    const { sut, searchServiceStub } = makeSut()
    const filterSpy = jest.spyOn(searchServiceStub, 'filter')
    await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query',
      },
    })
    expect(filterSpy).toHaveBeenCalledWith('service', 'any_query')
  })

  test('should return 200 if filter returns empty array', async () => {
    const { sut, searchServiceStub } = makeSut()
    jest
      .spyOn(searchServiceStub, 'filter')
      .mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query',
      },
    })
    expect(response).toEqual({
      statusCode: 200,
      body: [],
    })
  })

  test('should return 500 if filter throws error', async () => {
    const error = new Error()
    const { sut, searchServiceStub } = makeSut()
    jest.spyOn(searchServiceStub, 'filter').mockRejectedValueOnce(error)
    const response = await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query',
      },
    })
    expect(response).toEqual({
      statusCode: 500,
      body: error,
    })
  })

  test('should call validate with correct params', async () => {
    const { sut, validatorStub } = makeSut()
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query',
      },
    })
    expect(validateSpy).toHaveBeenCalledWith({
      typeQuery: 'service',
      query: 'any_query',
    })
  })

  test('should return 400 if validate throws', async () => {
    const error = new ValidationError('Ocorreu um error')
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error)
    const response = await sut.handle({
      query: {
        typeQuery: 'service',
        query: '',
      },
    })
    expect(response).toEqual({
      statusCode: 400,
      body: error,
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query',
      },
    })
    expect(response).toEqual({
      statusCode: 200,
      body: mockArrayServiceModel,
    })
  })
})
