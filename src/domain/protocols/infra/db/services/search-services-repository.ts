import { type ServiceModel } from '@/domain/model/service-model'

export interface SearchServicesRepository {
  filter: (typeQuery: string, query: string) => Promise<ServiceModel[]>
}
