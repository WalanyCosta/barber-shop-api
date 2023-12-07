import { type Hasher } from '../../domain/protocols/hasher'
import { hash } from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor (private readonly saltRounds: number) {}

  async hash (value: string): Promise<string> {
    const response = await hash(value, this.saltRounds)
    return response
  }
}
