import { type BarberModel } from '@/domain/model/barber-model'

export interface LoadBarberById {
  loadById: (id: string) => Promise<BarberModel | null>
}
