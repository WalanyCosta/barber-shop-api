import { type BarberModel } from '@/domain/model/barber-model'
import { type LoadBarberById } from '@/domain/protocols/presentation'
import { mockBarberModel } from '../../helpers/mock-barber-model'
import { type LoadBarbers } from '@/domain/protocols/presentation/barber/load-barbers'

export const makeLoadBarberByIdStub = (): LoadBarberById => {
  class LoadBarberByIdStub implements LoadBarberById {
    async loadById(id: string): Promise<BarberModel | null> {
      return await Promise.resolve(mockBarberModel)
    }
  }

  return new LoadBarberByIdStub()
}

export const makeLoadBarbersStub = (): LoadBarbers => {
  class LoadBarbersStub implements LoadBarbers {
    async load(): Promise<BarberModel[]> {
      return await Promise.resolve([mockBarberModel, mockBarberModel])
    }
  }

  return new LoadBarbersStub()
}
