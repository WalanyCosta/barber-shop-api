import { type AccountModel } from '@/domain/model/account-model'

export const mockAccountModel: AccountModel = {
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed',
  phone: 'any_phone',
  accessToken: 'any_value',
}

export const mockAddAccountParams = {
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  phone: 'any_phone',
}

export const mockAuthenticationParams = {
  email: 'any_email',
  password: 'any_password',
}
