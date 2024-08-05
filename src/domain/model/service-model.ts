export type TypeQueryService = 'service' | 'category'

export enum StatusService {
  ACTIVE = 'ACTIVE',
  PROMOTION = 'PROMOTION',
  DISABLED = 'DISABLED',
  REMOVED = 'REMOVED',
}

export type StatusServiceTypes = keyof typeof StatusService

export interface Option {
  orStatus?: StatusServiceTypes
  status?: StatusServiceTypes
}

export interface ServiceModel {
  id: string
  service: string
  price: number
  stars: number
  status: string
  category: string
  discount: number
  duraction: number
}
