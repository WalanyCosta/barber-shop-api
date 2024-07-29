import { mockArrayServiceModel } from '../../domain/mock/mock-service'
import { type ServiceModel } from '@/domain/model/service-model'
import {
  type LoadServices,
  type LoadServiceById,
  type SearchServices
} from '@/domain/protocols/presentation'

export const fakeResponseService = {
  id: 'any_id',
  service: 'any_name',
  price: 30,
  stars: 5,
  discount: 0.0,
  duraction: 900,
  status: 'active',
  category: 'any_category'
}

export const makeLoadServicesStub = (): LoadServices => {
  class LoadServicesStub implements LoadServices {
    async load (): Promise<ServiceModel[] | null> {
      return await Promise.resolve(mockArrayServiceModel)
    }
  }

  return new LoadServicesStub()
}

export const makeLoadServiceByIdStub = (): LoadServiceById => {
  class LoadServiceByIdStub implements LoadServiceById {
    async loadById (serviceId: string): Promise<ServiceModel | null> {
      return await Promise.resolve(fakeResponseService as ServiceModel)
    }
  }

  return new LoadServiceByIdStub()
}

export const makeSearchServicesStub = (): SearchServices => {
  class SearchServicesStub implements SearchServices {
    async filter (typeQuery: string, query: string): Promise<ServiceModel[]> {
      return await Promise.resolve([])
    }
  }

  return new SearchServicesStub()
}
