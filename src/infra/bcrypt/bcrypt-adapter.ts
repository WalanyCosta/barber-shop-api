import { type HashComparer } from './../../domain/protocols/infra/crypto/hash-comparer'
import { type Hasher } from '../../domain/protocols/infra/crypto/hasher'
import { hash, compare } from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly saltRounds: number) {}

  async compare (value: string, hash: string): Promise<boolean> {
    await compare(value, hash)
    return await Promise.resolve(false)
  }

  async hash (value: string): Promise<string> {
    const response = await hash(value, this.saltRounds)
    return response
  }
}
