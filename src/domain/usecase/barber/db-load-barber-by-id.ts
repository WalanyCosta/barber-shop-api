import { type BarberModel } from '@/domain/model/barber-model'
import { type LoadBarberByIdRepository } from '@/domain/protocols/infra/db'
import { type LoadBarberById } from '@/domain/protocols/presentation'
import { NotExistsRegister } from '@/presentation/errors'

export class DbLoadBarberById implements LoadBarberById {
  constructor (private readonly loadBarberByIdRepository: LoadBarberByIdRepository) {}
  async loadById (id: string): Promise<BarberModel | null> {
    const barber = await this.loadBarberByIdRepository.loadById(id)
    if (!barber) {
      throw new NotExistsRegister('No exists register with id')
    }
    return null
  }
}
