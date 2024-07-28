import { type AccountModel } from '@/domain/model/account-model'

export interface LoadAccountByIdOrEmail {
  loadByIdOrEmail: (idOrEmail: string) => Promise<AccountModel | null>
}
