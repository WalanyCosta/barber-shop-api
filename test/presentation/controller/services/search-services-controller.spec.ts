import { ValidationError } from '@/presentation/errors'
import { makeSearchServicesStub, makeValidatorStub } from '../../mocks'
import { SearchServicesController } from '@/presentation/controller'

describe('SearchServicesController', () => {
  test('should call filter with correct params', async () => {
    const searchServiceStub = makeSearchServicesStub()
    const validatorStub = makeValidatorStub()
    const sut = new SearchServicesController(searchServiceStub, validatorStub)
    const filterSpy = jest.spyOn(searchServiceStub, 'filter')
    await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query'
      }
    })
    expect(filterSpy).toHaveBeenCalledWith('service', 'any_query')
  })

  test('should return 200 if filter returns empty array', async () => {
    const searchServiceStub = makeSearchServicesStub()
    const validatorStub = makeValidatorStub()
    const sut = new SearchServicesController(searchServiceStub, validatorStub)
    jest.spyOn(searchServiceStub, 'filter').mockReturnValueOnce(Promise.resolve([]))
    const response = await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query'
      }
    })
    expect(response).toEqual({
      statusCode: 200,
      body: []
    })
  })

  test('should return 500 if filter throws error', async () => {
    const searchServiceStub = makeSearchServicesStub()
    const error = new Error()
    const validatorStub = makeValidatorStub()
    const sut = new SearchServicesController(searchServiceStub, validatorStub)
    jest.spyOn(searchServiceStub, 'filter').mockRejectedValueOnce(error)
    const response = await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query'
      }
    })
    expect(response).toEqual({
      statusCode: 500,
      body: error
    })
  })

  test('should call validate with correct params', async () => {
    const searchServiceStub = makeSearchServicesStub()
    const validatorStub = makeValidatorStub()
    const sut = new SearchServicesController(searchServiceStub, validatorStub)
    const validateSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle({
      query: {
        typeQuery: 'service',
        query: 'any_query'
      }
    })
    expect(validateSpy).toHaveBeenCalledWith({
      typeQuery: 'service',
      query: 'any_query'
    })
  })

  test('should return 400 if validate throws', async () => {
    const searchServiceStub = makeSearchServicesStub()
    const validatorStub = makeValidatorStub()
    const error = new ValidationError('Ocorreu um error')
    const sut = new SearchServicesController(searchServiceStub, validatorStub)
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(error)
    const response = await sut.handle({
      query: {
        typeQuery: 'service',
        query: ''
      }
    })
    expect(response).toEqual({
      statusCode: 400,
      body: error
    })
  })
})
