import prisma from './client'

export const cleanData = async (): Promise<void> => {
  await prisma.$transaction(
    [
      prisma.account.deleteMany()
    ]
  )
}

export const disconnect = async (): Promise<void> => {
  await prisma.$disconnect()
}
