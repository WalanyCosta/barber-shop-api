import { type LoadServices } from '@/domain/protocols/presentation'
import { mockServices } from '../../domain/mock/mock-service'
import { type ServiceModel } from '@/domain/model/service-model'
import { type LoadServiceById } from '@/domain/protocols/presentation/load-service-by-id'
import { type SearchServices } from '@/domain/protocols/presentation/search-service'

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
      return await Promise.resolve(mockServices)
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
