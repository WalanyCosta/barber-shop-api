import { type ServiceModel } from '@/domain/model/service-model'

export const mockServices = ([
  {
    id: 'any_id',
    name: 'any_name',
    price: 30,
    star: 5,
    status: 'active',
    category: 'any_category'
  },
  {
    id: 'other_id',
    name: 'other_name',
    price: 20,
    star: 3,
    status: 'disable',
    category: 'other_category'
  }
] as ServiceModel[])
