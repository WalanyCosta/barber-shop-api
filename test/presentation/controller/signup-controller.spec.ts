import { type Validator } from '@/presentation/protocols/validator'
import { EmailInUseError } from '@/presentation/errors/email-in-use-error'
import { type AddAccount, type AddAccountParam } from '@/domain/protocols/presentation'
import { ValidationError } from '@/presentation/errors/validation-error'
import { SignUpController } from '@/presentation/controller/signup/signup-controller'
import { makeValidatorStub } from '../mocks/mock-account'

interface SutTypes {
  sut: SignUpController
  addAccountRepositoryStub: AddAccount
  validatorStub: Validator
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const validatorStub = makeValidatorStub()
  const sut = new SignUpController(addAccountRepositoryStub, validatorStub)

  return {
    sut,
    addAccountRepositoryStub,
    validatorStub
  }
}

const makeAddAccountRepositoryStub = (): AddAccount => {
  class AddAccountRepositoryStub implements AddAccount {
    async add (addAccountParam: AddAccountParam): Promise<string | null> {
      return await Promise.resolve('any_token')
    }
  }

  return new AddAccountRepositoryStub()
}

const mockSignupParam = ({
  body: {
    name: 'any_name',
    email: 'any_email@gmail.com',
    password: 'Password123#',
    phone: 'any_phone'
  }
})

const badRequest = (message: string): any => {
  return {
    statusCode: 400,
    body: new ValidationError(message)
  }
}

describe('SignUp Controller', () => {
  test('should call Validator with param correct', async () => {
    const { sut, validatorStub } = makeSut()
    const addSpy = jest.spyOn(validatorStub, 'validate')
    await sut.handle(mockSignupParam)
    expect(addSpy).toHaveBeenCalledWith(mockSignupParam.body)
  })

  test('should return status 400 if Validate throws error', async () => {
    const { sut, validatorStub } = makeSut()
    jest.spyOn(validatorStub, 'validate').mockReturnValueOnce(new Error('Validation Error'))
    const httpResponse = await sut.handle(mockSignupParam)
    expect(httpResponse).toEqual(badRequest('Validation Error'))
  })

  test('should call AddAccountRepository with param correct', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.handle(mockSignupParam)
    expect(addSpy).toHaveBeenCalledWith(mockSignupParam.body)
  })

  test('should return 403 if AddAccountRepository email already exists', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(mockSignupParam)
    expect(httpResponse).toEqual({
      statusCode: 403,
      body: new EmailInUseError()
    })
  })

  test('should return 500 if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const error = new Error()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(error)
    const httpResponse = await sut.handle(mockSignupParam)
    expect(httpResponse).toEqual({
      statusCode: 500,
      body: error
    })
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockSignupParam)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: 'any_token'
    })
  })
})
