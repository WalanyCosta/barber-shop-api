import { type BarberModel } from '@/domain/model/barber-model'

export interface LoadBarbers {
  load: () => Promise<BarberModel[]>
}
