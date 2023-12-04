import { EmailInUseError } from './../../../src/presentation/errors/email-in-use-error'
import { type AddAccountRepository, type AddAccountParam } from './../../../src/domain/protocols/add-account'
import { ValidationError } from '../../../src/presentation/errors/validation-error'
import { SignUpController } from './../../../src/presentation/controller/signup/signup-controller'

interface SutTypes {
  sut: SignUpController
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new SignUpController(addAccountRepositoryStub)

  return {
    sut,
    addAccountRepositoryStub
  }
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccountParam: AddAccountParam): Promise<string | null> {
      return await Promise.resolve('any_token')
    }
  }

  return new AddAccountRepositoryStub()
}

const badRequest = (message: string): any => {
  return {
    statusCode: 400,
    body: new ValidationError(message)
  }
}

describe('SignUp Controller', () => {
  test('should return status 400 if name is required', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('name is required. Please write name'))
  })

  test('should return status 400 if name is empty', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: '',
        email: 'any_email@mail.com',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('name is empty. Please write name'))
  })

  test('should return status 400 if email is required', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('email is required. Please write email'))
  })

  test('should return status 400 if email is empty', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: '',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('email is empty. Please write email'))
  })

  test('should return status 400 if email is invalid', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('email is invalid. Please write email correctly'))
  })

  test('should return status 400 password is required', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('Password is invalid. Please write password'))
  })

  test('should return status 400 password is weak', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('Password is weak. Please write password'))
  })

  test('should return status 400 if password haven`t least 8 characters in length', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'Pas1#',
        Phone: 'any_telefone'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('Password must be at least 8 characters in length'))
  })

  test('should return status 400 if phone is required', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'Password123#'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('phone is required. Please write phone'))
  })

  test('should return status 400 if phone is empty', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'Password123#',
        phone: ''
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest('phone is empty. Please write phone'))
  })

  test('should call AddAccountRepository with param correct', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'Password123#',
        phone: 'any_phone'
      }
    }
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should return 403 if AddAccountRepository email already exists', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'Password123#',
        phone: 'any_phone'
      }
    }
    jest.spyOn(addAccountRepositoryStub, 'add').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 403,
      body: new EmailInUseError()
    })
  })
})
