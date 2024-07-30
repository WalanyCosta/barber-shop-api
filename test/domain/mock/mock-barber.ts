import { type BarberModel } from '../model/barber-model'
import { type LoadBarberByIdRepository } from '../protocols/infra/db'

export const mockBarberModel: BarberModel = {
  id: 'any_id',
  name: 'any_id',
  birthday: 'any_birthday',
  email: 'any_email',
  phone: 'any_phone',
  experience: 'any_experience',
  experience_year: 3,
  start: 5,
  status: 'any_status',
  image_url: 'any_image_url'
}

export const makeLoadBarberByIdRepositoryStub = (): LoadBarberByIdRepository => {
  class LoadBarberByIdRepositoryStub implements LoadBarberByIdRepository {
    async loadById (id: string): Promise<BarberModel | null> {
      return await Promise.resolve(mockBarberModel)
    }
  }

  return new LoadBarberByIdRepositoryStub()
}
