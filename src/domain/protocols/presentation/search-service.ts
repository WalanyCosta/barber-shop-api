import { type ServiceModel } from '@/domain/model/service-model'

export interface SearchServices {
  filter: (typeQuery: string, query: string) => Promise<ServiceModel[]>
}
