import { type Controller } from '@/presentation/protocols/controller'
import { AccountRepository } from '@/infra/db/prisma'
import { LoadAccountByIdController } from '@/presentation/controller'
import { DbLoadAccountByIdOrEmail } from '@/domain/usecase/account/db-load-account-by-id-or-email'

export const makeLoadAccountByIdFactory = (): Controller => {
  const makeAccountRepository = new AccountRepository()
  const dbLoadAccountByIdOrEmail = new DbLoadAccountByIdOrEmail(
    makeAccountRepository,
  )
  const loadAccountByIdController = new LoadAccountByIdController(
    dbLoadAccountByIdOrEmail,
  )
  return loadAccountByIdController
}
