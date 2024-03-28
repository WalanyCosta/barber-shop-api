import { type LoadServices } from '@/domain/protocols/presentation'
import { mockServices } from '../../domain/mock/mock-service'
import { type ServiceModel } from '@/domain/model/service-model'

export const makeLoadServicesStub = (): LoadServices => {
  class LoadServicesStub implements LoadServices {
    async load (): Promise<ServiceModel[] | null> {
      return await Promise.resolve(mockServices)
    }
  }

  return new LoadServicesStub()
}
