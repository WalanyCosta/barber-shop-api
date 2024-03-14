import { type AccountModel } from '../../../model/account-model'

export interface LoadAccountByTokenRepository {
  loadByToken: (accountToken: string) => Promise<AccountModel>
}
