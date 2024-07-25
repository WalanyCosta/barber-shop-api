import { type LoadServices } from '@/domain/protocols/presentation'
import { mockServices } from '../../domain/mock/mock-service'
import { type ServiceModel } from '@/domain/model/service-model'
import { type LoadServiceById } from '@/domain/protocols/presentation/load-service-by-id'

export const makeLoadServicesStub = (): LoadServices => {
  class LoadServicesStub implements LoadServices {
    async load (): Promise<ServiceModel[] | null> {
      return await Promise.resolve(mockServices)
    }
  }

  return new LoadServicesStub()
}

export const makeLoadServiceByIdStub = (): LoadServiceById => {
  class LoadServiceByIdStub implements LoadServiceById {
    async loadById (serviceId: string): Promise<ServiceModel | null> {
      return await Promise.resolve(null)
    }
  }

  return new LoadServiceByIdStub()
}
