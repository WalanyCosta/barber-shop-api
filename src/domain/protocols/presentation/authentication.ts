export interface AuthenticationParam {
  email: string
  password: string
}

export interface Authentication {
  auth: (param: AuthenticationParam) => Promise<string | null>
}
