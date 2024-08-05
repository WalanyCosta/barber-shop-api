import { type AccountModel } from './account-model'
import { type BarberModel } from './barber-model'

export enum StatusSchedule {
  CANCELED = 'CANCELADO',
  FINISHED = 'FINALIZADO',
  WAITING = 'ESPERANDO',
  EXECUTING = 'EXECUTANDO',
}

export interface ScheduleModel {
  id: string
  total_time: number
  status: string
  accountId?: string
  account?: AccountModel
  barberId?: string
  barber?: BarberModel
}
