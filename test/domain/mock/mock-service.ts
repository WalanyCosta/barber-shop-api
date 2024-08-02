import { type LoadServiceByIdRepository } from '@/domain/protocols/infra/db/services/load-service-by-id-repository'
import { type ServiceModel } from '@/domain/model/service-model'
import { type SearchServicesRepository } from '../protocols/infra/db/services/search-services-repository'
import {
  mockArrayServiceModel,
  mockServiceModel,
} from '../../helpers/mock-service-model'
import { type LoadServicesRepository } from '../protocols/infra/db'

export const makeLoadServiceByIdRepositoryStub =
  (): LoadServiceByIdRepository => {
    class LoadServiceByIdRepositoryStub implements LoadServiceByIdRepository {
      async loadById(serviceId: string): Promise<ServiceModel | null> {
        return mockServiceModel
      }
    }

    return new LoadServiceByIdRepositoryStub()
  }

export const makeSearchServicesRepositoryStub =
  (): SearchServicesRepository => {
    class SearchServicesRepositoryStub implements SearchServicesRepository {
      async filter(typeQuery: string, query: string): Promise<ServiceModel[]> {
        return await Promise.resolve(mockArrayServiceModel)
      }
    }
    return new SearchServicesRepositoryStub()
  }

export const makeLoadServicesRepository = (): LoadServicesRepository => {
  class LoadServicesRepositoryStub implements LoadServicesRepository {
    async load(): Promise<ServiceModel[]> {
      return await Promise.resolve(mockArrayServiceModel)
    }
  }

  return new LoadServicesRepositoryStub()
}
