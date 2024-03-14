import { DbAuthentication } from '../../../domain/usecase/db-authentication'
import { BcryptAdapter } from '../../../infra/bcrypt/bcrypt-adapter'
import { AccountRepository } from '../../../infra/db/prisma/account/account-repository'
import { JwtAdapter } from '../../../infra/jw-adapter/jwt-adapter'
import { LoginSchema } from '../../../infra/validator/schema/login-schema'
import { ZodValidator } from '../../../infra/validator/zod-validator'
import { LoginController } from '../../../presentation/controller/login/login-controller'
import { type Controller } from '../../../presentation/protocols/controller'

export const makeLoginController = (): Controller => {
  const salt = 12
  const makeBcryptAdapter = new BcryptAdapter(salt)
  const makeJwtAdapter = new JwtAdapter(process.env.PRIVATE_KEY as string)
  const makeAccountRepository = new AccountRepository()
  const makeDbAuthentication = new DbAuthentication(
    makeAccountRepository,
    makeBcryptAdapter,
    makeJwtAdapter,
    makeAccountRepository
  )
  const makeZodValidator = new ZodValidator(LoginSchema)
  const loginController = new LoginController(makeZodValidator, makeDbAuthentication)
  return loginController
}
