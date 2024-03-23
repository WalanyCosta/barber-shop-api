export interface Decryptor {
  decrypt: (token: string) => Promise<string>
}
