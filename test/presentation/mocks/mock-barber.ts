import { type BarberModel } from '@/domain/model/barber-model'
import { type LoadBarberById } from '@/domain/protocols/presentation'
import { mockBarberModel } from '../../helpers/mock-barber-model'

export const makeLoadBarberByIdStub = (): LoadBarberById => {
  class LoadBarberByIdStub implements LoadBarberById {
    async loadById(id: string): Promise<BarberModel | null> {
      return await Promise.resolve(mockBarberModel)
    }
  }

  return new LoadBarberByIdStub()
}
