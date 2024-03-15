import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categoriesDatas = [
    {category: 'cortes de cabelo'},
    {category: 'cortes de barber'}
]

const servicesDatas = [
    {
        name: 'Francês',
        price: 700,
        stars: 3,
        status: 'active',
        categoryId: 1
    },
    {
        name: 'careca',
        price: 2000,
        stars: 3,
        status: 'active',
        categoryId: 1
    },
    {
        name: 'sombra',
        price: 1000,
        stars: 3,
        status: 'active',
        categoryId: 2
    },
]

async function main() {
  await prisma.category.createMany({
    data: categoriesDatas
  }),
  await prisma.service.createMany({
    data: servicesDatas
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