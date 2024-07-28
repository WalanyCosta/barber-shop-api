import { type AccountModel } from '@/domain/model/account-model'

export interface LoadAccountByIdOrEmailRepository {
  load: (idOrEmail: string) => Promise<AccountModel | null>
}
