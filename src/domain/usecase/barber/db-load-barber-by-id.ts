import { type BarberModel } from '@/domain/model/barber-model'
import { type LoadBarberByIdRepository } from '@/domain/protocols/infra/db'
import { type LoadBarberById } from '@/domain/protocols/presentation'

export class DbLoadBarberById implements LoadBarberById {
  constructor (private readonly loadBarberByIdRepository: LoadBarberByIdRepository) {}
  async loadById (id: string): Promise<BarberModel | null> {
    await this.loadBarberByIdRepository.loadById(id)
    return null
  }
}
