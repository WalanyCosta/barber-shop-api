import { StatusService } from '../../src/domain/model/service-model';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categoriesDatas = [
    {category: 'cortes de cabelo'},
    {category: 'cortes de barber'}
]

const createFakeTimeScheduleData = async (): Promise<any[]> => {
    let schedules: any[] = []
    await prisma.$transaction(async (prismaTransaction) => {
      schedules = await prismaTransaction.schedule.findMany()
  
      await prismaTransaction.time_schedule.createMany({
        data: [
          {
            date_schedule: new Date('2024-08-05'),
            time_schedule: 480,
            schedule_id: schedules[0].id,
          },
          {
            date_schedule: new Date('2024-08-05'),
            time_schedule: 495,
            schedule_id: schedules[1].id,
          },
        ],
      })
    })
    return schedules
}

const createFakeScheduleAndBarberData = async (): Promise<any> => {
    let barber
    await prisma.$transaction(async (prismaTransaction) => {
      barber = await prismaTransaction.barber.create({
        data: {
            name: 'any_name',
            email: 'any_email',
            phone: 'any_phone',
            experience: 'any_experience',
            experience_year: 3,
            start: 5,
            image_url: 'any_image_url',
            status: 'active',
            birthday: new Date('2024-08-05').toISOString(),
        },
      })
      await prismaTransaction.schedule.createMany({
        data: [
          {
            status: 'ESPERANDO',
            total_time: 0,
            barber_id: barber.id,
          },
          {
            status: 'ESPERANDO',
            total_time: 0,
            barber_id: barber.id,
          },
        ],
      })
    })
  
    return barber
}
  
async function main() {
  await prisma.category.createMany({
    data: categoriesDatas
  })

  await prisma.service.create({
    data:{
        service: 'Francês',
        price: 700,
        stars: 3,
        status: StatusService.ACTIVE,
        discount: 0.0,
        duraction: 900,
        category:{
            create:{
                category: 'apertar dreids'
            }
        }
    }
  })

  await createFakeScheduleAndBarberData()

  await createFakeTimeScheduleData()
}
  
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})