import { type ServiceModel } from '@/domain/model/service-model'
import { type LoadServiceByIdRepository } from '@/domain/protocols/infra/db'
import { type LoadServiceById } from '@/domain/protocols/presentation'

export class DbLoadServiceById implements LoadServiceById {
  constructor(
    private readonly loadServiceByIdRepository: LoadServiceByIdRepository,
  ) {}

  async loadById(serviceId: string): Promise<ServiceModel | null> {
    const service = await this.loadServiceByIdRepository.loadById(serviceId)
    return service
  }
}
