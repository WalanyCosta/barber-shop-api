import { StatusBarber, type BarberModel } from '@/domain/model/barber-model'
import { type LoadBarbersRepository } from '@/domain/protocols/infra/db'
import { type LoadBarbers } from '@/domain/protocols/presentation/barber'

export class DbLoadBarbers implements LoadBarbers {
  constructor(private readonly loadBarbersRepository: LoadBarbersRepository) {}
  async load(): Promise<BarberModel[]> {
    const barbers = await this.loadBarbersRepository.load(StatusBarber.active)
    return barbers
  }
}
