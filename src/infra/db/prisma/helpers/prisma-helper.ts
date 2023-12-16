import prisma from './client'

export const cleanData = async (): Promise<void> => {
  await prisma.$transaction(
    [
      prisma.account.deleteMany()
    ]
  )
}
