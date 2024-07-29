import { type ServiceModel } from '@/domain/model/service-model'

export interface LoadServices {
  load: () => Promise<ServiceModel[] | null>
}
