export type StatusService = 'active' | 'promotion' | 'disable'

export interface ServiceModel {
  id: string
  service: string
  price: number
  stars: number
  status: StatusService
  category: string
  discount: number
  duraction: number
}
