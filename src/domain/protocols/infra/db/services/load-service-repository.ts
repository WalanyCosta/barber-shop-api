import { type Option, type ServiceModel } from '@/domain/model/service-model'

export interface LoadServicesRepository {
  load: (option: Option) => Promise<ServiceModel[]>
}
