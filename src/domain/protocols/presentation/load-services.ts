import { type ServiceModel } from '../../model/service-model'

export interface LoadServices {
  load: () => Promise<ServiceModel>
}
