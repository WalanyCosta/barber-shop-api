import { type ServiceModel } from '@/domain/model/service-model'

export interface LoadServiceById {
  loadById: (serviceId: string) => Promise<ServiceModel | null>
}
