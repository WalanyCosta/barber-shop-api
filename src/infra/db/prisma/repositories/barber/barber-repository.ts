import { BarberModel, StatusBarber } from '@/domain/model/barber-model'
import { LoadBarberByIdRepository, LoadBarbersRepository} from '@/domain/protocols/infra/db'
import prisma from '@/infra/db/prisma/helpers/client'

export class BarberRepository implements 
LoadBarberByIdRepository,
LoadBarbersRepository
{
  async loadById(id: string): Promise<BarberModel | null>{
    const barber = await prisma.barber.findUnique({
        where:{id}
    })

    return barber
  }

  async load(statusBarber: StatusBarber): Promise<BarberModel[]>{
    const barbers = await prisma.barber.findMany({
        where:{
            status: statusBarber
        }
    })

    return barbers
  }
}
