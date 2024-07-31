import { type ServiceModel } from '@/domain/model/service-model'
import {
  type LoadServices,
  type LoadServiceById,
  type SearchServices,
} from '@/domain/protocols/presentation'
import {
  mockArrayServiceModel,
  mockServiceModel,
} from '../../helper/mock-service-model'

export const makeLoadServicesStub = (): LoadServices => {
  class LoadServicesStub implements LoadServices {
    async load(): Promise<ServiceModel[] | null> {
      return await Promise.resolve(mockArrayServiceModel)
    }
  }

  return new LoadServicesStub()
}

export const makeLoadServiceByIdStub = (): LoadServiceById => {
  class LoadServiceByIdStub implements LoadServiceById {
    async loadById(serviceId: string): Promise<ServiceModel | null> {
      return await Promise.resolve(mockServiceModel)
    }
  }

  return new LoadServiceByIdStub()
}

export const makeSearchServicesStub = (): SearchServices => {
  class SearchServicesStub implements SearchServices {
    async filter(typeQuery: string, query: string): Promise<ServiceModel[]> {
      return await Promise.resolve(mockArrayServiceModel)
    }
  }

  return new SearchServicesStub()
}
