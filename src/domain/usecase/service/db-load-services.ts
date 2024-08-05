import { StatusService, type ServiceModel } from '@/domain/model/service-model'
import { type LoadServicesRepository } from '@/domain/protocols/infra/db'
import { type LoadServices } from '@/domain/protocols/presentation'

export class DbLoadServices implements LoadServices {
  constructor(
    private readonly loadServicesRepository: LoadServicesRepository,
  ) {}

  async load(): Promise<ServiceModel[] | null> {
    const services = await this.loadServicesRepository.load({
      status: StatusService.ACTIVE,
      orStatus: StatusService.PROMOTION,
    })
    return services
  }
}
