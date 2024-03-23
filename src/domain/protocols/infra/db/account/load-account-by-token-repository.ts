import { type AccountModel } from '@/domain/model/account-model'

export interface LoadAccountByTokenRepository {
  loadByToken: (accessToken: string) => Promise<AccountModel | null>
}
