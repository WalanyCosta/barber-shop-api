import { type AccountModel } from '../../../model/account-model'

export interface LoadAccountByEmailRepository {
  load: (email: string) => Promise<AccountModel | null>
}
