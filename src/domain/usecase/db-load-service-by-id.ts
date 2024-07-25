import { type ServiceModel } from '../model/service-model'
import { type LoadServiceByIdRepository } from '../protocols/infra/db/services/load-service-by-id-repository'
import { type LoadServiceById } from '../protocols/presentation/load-service-by-id'

export class DbLoadServiceById implements LoadServiceById {
  constructor (private readonly loadServiceByIdRepository: LoadServiceByIdRepository) {}
  async loadById (serviceId: string): Promise<ServiceModel | null> {
    await this.loadServiceByIdRepository.loadById(serviceId)
    return await Promise.resolve(null)
  }
}
