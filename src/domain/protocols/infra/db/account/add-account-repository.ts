import { type AccountModel } from '@/domain/model/account-model'

export interface AddAccountModel {
  name: string
  email: string
  password: string
  phone: string
}

export interface AddAccountRepository {
  add: (addAccountModel: AddAccountModel) => Promise<AccountModel>
}
