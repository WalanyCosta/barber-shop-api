import { DbAddAccount } from '@/domain/usecase/account/db-add-account'
import { AccountRepository } from '@/infra/db/prisma'
import {
  JwtAdapter,
  signupSchema,
  BcryptAdapter,
  ZodValidator,
} from '@/infra/libs'
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
    makeAccountRepository,
  )
  const makeZodValidator = new ZodValidator(signupSchema)
  const signUpController = new SignUpController(
    makeDbAddAccount,
    makeZodValidator,
  )
  return signUpController
}
