export enum StatusService {
  active,
  promotion,
  disable
}

export interface ServiceModel {
  id: string
  name: string
  price: number
  star: number
  status: StatusService
  category: string
}
