import { type ServiceModel } from '../model/service-model'
import { type LoadServicesRepository } from '../protocols/infra/db/load-service-repository'
import { type LoadServices } from '../protocols/presentation/load-services'

export class DbLoadServices implements LoadServices {
  constructor (private readonly loadServicesRepository: LoadServicesRepository) {}
  async load (): Promise<ServiceModel[] | null> {
    const services = await this.loadServicesRepository.load()
    return services
  }
}
