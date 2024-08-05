import { StatusService } from '../../src/domain/model/service-model';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categoriesDatas = [
    {category: 'cortes de cabelo'},
    {category: 'cortes de barber'}
]


async function main() {
  await prisma.category.createMany({
    data: categoriesDatas
  }),
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