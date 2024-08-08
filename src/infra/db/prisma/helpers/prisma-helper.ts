import prisma from './client'

export const cleanData = async (): Promise<void> => {
  await prisma.$transaction(
    [
      prisma.account.deleteMany(),
      prisma.service.deleteMany(),
      prisma.category.deleteMany(),
      prisma.time_schedule.deleteMany(),
      prisma.schedule.deleteMany(),
      prisma.barber.deleteMany(),
    ]
  )
}

export const disconnect = async (): Promise<void> => {
  await prisma.$disconnect()
}
