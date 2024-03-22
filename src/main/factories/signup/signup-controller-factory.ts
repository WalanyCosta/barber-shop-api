import { DbAddAccount } from '@/domain/usecase/db-add-account'
import { BcryptAdapter } from '@/infra/bcrypt/bcrypt-adapter'
import { AccountRepository } from '@/infra/db/prisma/account/account-repository'
import { JwtAdapter } from '@/infra/jw-adapter/jwt-adapter'
import { signupSchema } from '@/infra/validator/schema/signup-schema'
import { ZodValidator } from '@/infra/validator/zod-validator'
import { SignUpController } from '@/presentation/controller/signup/signup-controller'
import { type Controller } from '@/presentation/protocols/controller'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const makeBcryptAdapter = new BcryptAdapter(salt)
  const makeJwtAdapter = new JwtAdapter(process.env.PRIVATE_KEY as string)
  const makeAccountRepository = new AccountRepository()
  const makeDbAddAccount = new DbAddAccount(
    makeAccountRepository,
    makeBcryptAdapter,
    makeAccountRepository,
    makeJwtAdapter,
    makeAccountRepository
  )
  const makeZodValidator = new ZodValidator(signupSchema)
  const signUpController = new SignUpController(makeDbAddAccount, makeZodValidator)
  return signUpController
}
