import { type ServiceModel } from '@/domain/model/service-model'

export interface LoadServicesRepository {
  load: () => Promise<ServiceModel[]>
}
