import { type AccountModel } from '../../../model/account-model'

export interface LoadAccountByTokenRepository {
  loadByToken: (accessToken: string) => Promise<AccountModel | null>
}
