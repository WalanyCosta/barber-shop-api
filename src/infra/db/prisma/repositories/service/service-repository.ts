import { TypeQueryService, type ServiceModel } from '@/domain/model/service-model'
import { type LoadServicesRepository } from '@/domain/protocols/infra/'
import { LoadServiceByIdRepository } from '@/domain/protocols/infra/db/services/load-service-by-id-repository'
import { SearchServicesRepository } from '@/domain/protocols/infra/db/services/search-services-repository'
import prisma from '@/infra/db/prisma/helpers/client'

export class ServicesRepository implements 
LoadServicesRepository, 
LoadServiceByIdRepository,
SearchServicesRepository
{
  async load (): Promise<ServiceModel[]> {
    const services = await prisma.service.findMany({
      include: {
        category: {
          select: {
            category: true
          }
        }
      },
      where: {
        OR: [
          { status: 'active' },
          {
            status: 'promotion'
          }
        ]
      }
    })

    const newServices = services.map((service) => {
      return {
        id: service.id,
        service: service.service,
        price: service.price,
        stars: service.stars,
        status: 'active',
        category: service.category.category,
        duraction: service.duraction,
        discount: service.discount
      }
    })

    return newServices as ServiceModel[]
  }

  async loadById(serviceId: string): Promise<ServiceModel | null>{
    const service = await prisma.service.findUnique({
        include: {
            category: true
        },
        where:{
            id: serviceId
        }
    })

    return {
        ...service,
        category: service?.category.category
    } as ServiceModel
  }

  async filter(typeQuery: TypeQueryService, query: string): Promise<ServiceModel[]>{
    const services = await prisma.service.findMany({
        include: {
            category: true
        },
        where: (typeQuery === 'service' ? {service: query} : {category: {category: query}})
    })

    return services.map((service) => {
        return {
          id: service.id,
          service: service.service,
          price: service.price,
          stars: service.stars,
          status: 'active',
          category: service.category.category,
          duraction: service.duraction,
          discount: service.discount
        }
      })
  }
}
