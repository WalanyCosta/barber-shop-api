import { type ServiceModel } from '@/domain/model/service-model'
import { type LoadServicesRepository } from '@/domain/protocols/infra/db/services/load-service-repository'
import prisma from '@/infra/db/prisma/helpers/client'
export class ServicesRepository implements LoadServicesRepository {
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

    const newServices = services.map(service => {
      return {
        id: service.id,
        name: service.name,
        price: service.price,
        star: service.stars,
        status: 'active',
        category: service.category.category
      }
    })

    return newServices as ServiceModel[]
  }
}
