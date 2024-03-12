export interface LoadAccountByToken {
  load: (accessToken: string) => Promise<string>
}
