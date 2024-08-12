import { type Controller } from '@/presentation/protocols/controller'
import { AccountRepository } from '@/infra/db/prisma'
import { LoginController } from '@/presentation/controller/login/login-controller'
import { DbAuthentication } from '@/domain/usecase/account/db-authentication'
import {
  JwtAdapter,
  BcryptAdapter,
  ZodValidator,
  LoginSchema,
} from '@/infra/libs'

export const makeLoginController = (): Controller => {
  const salt = 12
  const makeBcryptAdapter = new BcryptAdapter(salt)
  const makeJwtAdapter = new JwtAdapter(process.env.PRIVATE_KEY as string)
  const makeAccountRepository = new AccountRepository()
  const makeDbAuthentication = new DbAuthentication(
    makeAccountRepository,
    makeBcryptAdapter,
    makeJwtAdapter,
    makeAccountRepository,
  )
  const makeZodValidator = new ZodValidator(LoginSchema)
  const loginController = new LoginController(
    makeZodValidator,
    makeDbAuthentication,
  )
  return loginController
}
