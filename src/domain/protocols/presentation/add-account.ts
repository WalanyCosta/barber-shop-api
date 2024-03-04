export interface AddAccountParam {
  name: string
  email: string
  password: string
  phone: string
}

export interface AddAccount {
  add: (addAccountParam: AddAccountParam) => Promise<string | null>
}
