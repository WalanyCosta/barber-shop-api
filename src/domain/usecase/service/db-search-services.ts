import { type ServiceModel } from '@/domain/model/service-model'
import { type SearchServicesRepository } from '@/domain/protocols/infra/db/services/search-services-repository'
import { type SearchServices } from '@/domain/protocols/presentation/search-service'

export class DbSearchServices implements SearchServices {
  constructor (private readonly searchServicesRepository: SearchServicesRepository) {}

  async filter (typeQuery: string, query: string): Promise<ServiceModel[]> {
    this.searchServicesRepository.filter(typeQuery, query)
    return await Promise.resolve([])
  }
}
