import { type TypeQueryService, type ServiceModel } from '@/domain/model/service-model'

export interface SearchServices {
  filter: (typeQuery: TypeQueryService, query: string) => Promise<ServiceModel[]>
}
