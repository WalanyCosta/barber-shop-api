import { BarberModel } from '@/domain/model/barber-model'
import { LoadBarberByIdRepository} from '@/domain/protocols/infra/db'
import prisma from '@/infra/db/prisma/helpers/client'

export class BarberRepository implements 
LoadBarberByIdRepository
{
  async loadById(id: string): Promise<BarberModel | null>{
    const barber = await prisma.barber.findUnique({
        where:{id}
    })

    return barber
  }
}
