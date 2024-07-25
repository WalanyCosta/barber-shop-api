import { type ServiceModel } from '@/domain/model/service-model'

export interface LoadServiceByIdRepository {
  loadById: (serviceId: string) => Promise<ServiceModel | null>
}
