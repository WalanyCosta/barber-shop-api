import prisma from './client'

export const cleanData = async (): Promise<void> => {
  await prisma.$transaction(
    [
      prisma.account.deleteMany(),
      prisma.service.deleteMany(),
      prisma.category.deleteMany()
    ]
  )
}

export const disconnect = async (): Promise<void> => {
  await prisma.$disconnect()
}
