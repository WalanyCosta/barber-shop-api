import { DbLoadAccountByToken } from '@/domain/usecase/db-load-account-by-token'
import { AccountRepository } from '@/infra/db/prisma/repositories/account/account-repository'
import { JwtAdapter } from '@/infra/jw-adapter/jwt-adapter'
import { AuthMiddleware } from '@/presentation/middleware/auth-middleware'
import { type Middleware } from '@/presentation/protocols/middlawre'

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdatpter = new JwtAdapter(String(process.env?.PRIVATE_KEY))
  const accountRepository = new AccountRepository()
  const dbLoadAccountByToken = new DbLoadAccountByToken(jwtAdatpter, accountRepository)
  return new AuthMiddleware(dbLoadAccountByToken)
}
