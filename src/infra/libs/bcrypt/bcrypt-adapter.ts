import { type HashComparer, type Hasher } from '@/domain/protocols/infra/crypto'
import { hash, compare } from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly saltRounds: number) {}

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await compare(value, hash)
    return isValid
  }

  async hash (value: string): Promise<string> {
    const response = await hash(value, this.saltRounds)
    return response
  }
}
