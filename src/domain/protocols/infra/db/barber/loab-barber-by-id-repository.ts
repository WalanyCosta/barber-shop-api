import { type BarberModel } from '@/domain/model/barber-model'

export interface LoadBarberByIdRepository {
  loadById: (id: string) => Promise<BarberModel | null>
}
