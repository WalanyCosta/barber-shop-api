import {
  type TypeQueryService,
  type ServiceModel,
} from '@/domain/model/service-model'

export interface SearchServicesRepository {
  filter: (
    typeQuery: TypeQueryService,
    query: string,
  ) => Promise<ServiceModel[]>
}
