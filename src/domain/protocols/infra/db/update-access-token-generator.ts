export interface UpdateAccessTokenGenerator {
  updateAccessToken: (id: string, accessToken: string) => Promise<void>
}
