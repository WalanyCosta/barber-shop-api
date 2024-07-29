import { type TypeQueryService, type ServiceModel } from '@/domain/model/service-model'
import { type SearchServicesRepository } from '@/domain/protocols/infra/db'
import { type SearchServices } from '@/domain/protocols/presentation'

export class DbSearchServices implements SearchServices {
  constructor (private readonly searchServicesRepository: SearchServicesRepository) {}

  async filter (typeQuery: TypeQueryService, query: string): Promise<ServiceModel[]> {
    const services = await this.searchServicesRepository.filter(typeQuery, query)
    return services
  }
}
