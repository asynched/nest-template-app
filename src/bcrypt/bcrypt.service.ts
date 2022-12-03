import { Injectable } from '@nestjs/common'
import { compare, genSalt, hash } from 'bcrypt'

@Injectable()
export class BcryptService {
  async hash(source: string): Promise<string> {
    const salt = await genSalt()
    return hash(source, salt)
  }

  async compare(nonHashed: string, hash: string): Promise<boolean> {
    return compare(nonHashed, hash)
  }
}
