import { type ServiceModel } from '@/domain/model/service-model'

export const mockServices = ([
  {
    id: 'any_id',
    service: 'any_name',
    price: 30,
    star: 5,
    discount: 0.0,
    duration: 900,
    status: 'active',
    category: 'any_category'
  },
  {
    id: 'other_id',
    service: 'other_name',
    price: 20,
    discount: 0.0,
    duraction: 900,
    stars: 3,
    status: 'disable',
    category: 'other_category'
  }
] as ServiceModel[])
