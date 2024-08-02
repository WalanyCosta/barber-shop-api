import { mockBarberModel } from '../../helpers/mock-barber-model'
import { type BarberModel } from '../model/barber-model'
import {
  type LoadBarbersRepository,
  type LoadBarberByIdRepository,
} from '../protocols/infra/db'

export const makeLoadBarberByIdRepositoryStub =
  (): LoadBarberByIdRepository => {
    class LoadBarberByIdRepositoryStub implements LoadBarberByIdRepository {
      async loadById(id: string): Promise<BarberModel | null> {
        return await Promise.resolve(mockBarberModel)
      }
    }

    return new LoadBarberByIdRepositoryStub()
  }

export const makeLoadBarbersRepositoryStub = (): LoadBarbersRepository => {
  class LoadBarbersRepositoryStub implements LoadBarbersRepository {
    async load(): Promise<BarberModel[]> {
      return await Promise.resolve([mockBarberModel, mockBarberModel])
    }
  }

  return new LoadBarbersRepositoryStub()
}
