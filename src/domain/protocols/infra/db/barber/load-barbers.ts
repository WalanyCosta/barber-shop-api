import {
  type StatusBarber,
  type BarberModel,
} from '@/domain/model/barber-model'

export interface LoadBarbersRepository {
  load: (statusBarber: StatusBarber) => Promise<BarberModel[]>
}
