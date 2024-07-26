import { DbLoadAccountByToken } from '@/domain/usecase/account/db-load-account-by-token'
import { AccountRepository } from '@/infra/db/prisma'
import { JwtAdapter } from '@/infra/libs'
import { AuthMiddleware } from '@/presentation/middleware/auth-middleware'
import { type Middleware } from '@/presentation/protocols/middleware'

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdapter = new JwtAdapter(String(process.env?.PRIVATE_KEY))
  const accountRepository = new AccountRepository()
  const dbLoadAccountByToken = new DbLoadAccountByToken(jwtAdapter, accountRepository)
  return new AuthMiddleware(dbLoadAccountByToken)
}
