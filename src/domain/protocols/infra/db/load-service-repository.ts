import { type ServiceModel } from '../../../model/service-model'

export interface LoadServicesRepository {
  load: () => Promise<ServiceModel[]>
}
