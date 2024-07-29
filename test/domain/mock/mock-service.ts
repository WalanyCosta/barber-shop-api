import { type LoadServiceByIdRepository } from '@/domain/protocols/infra/db/services/load-service-by-id-repository'
import { type ServiceModel } from '@/domain/model/service-model'
import { type SearchServicesRepository } from '../protocols/infra/db/services/search-services-repository'

export const mockServiceModel: ServiceModel = ({
  id: 'any_id',
  service: 'any_name',
  price: 30,
  stars: 5,
  discount: 0.0,
  duraction: 900,
  status: 'active',
  category: 'any_category'
})

export const mockArrayServiceModel = ([
  {
    id: 'any_id',
    service: 'any_name',
    price: 30,
    stars: 5,
    discount: 0.0,
    duraction: 900,
    status: 'active',
    category: 'any_category'
  },
  {
    id: 'other_id',
    service: 'other_name',
    price: 20,
    discount: 0.0,
    duraction: 900,
    stars: 3,
    status: 'disable',
    category: 'other_category'
  }
] as ServiceModel[])

export const makeLoadServiceByIdRepositoryStub = (): LoadServiceByIdRepository => {
  class LoadServiceByIdRepositoryStub implements LoadServiceByIdRepository {
    async loadById (serviceId: string): Promise<ServiceModel | null> {
      return mockServiceModel
    }
  }

  return new LoadServiceByIdRepositoryStub()
}

export const makeSearchServicesRepositoryStub = (): SearchServicesRepository => {
  class SearchServicesRepositoryStub implements SearchServicesRepository {
    async filter (typeQuery: string, query: string): Promise<ServiceModel[]> {
      return await Promise.resolve(mockArrayServiceModel)
    }
  }
  return new SearchServicesRepositoryStub()
}
