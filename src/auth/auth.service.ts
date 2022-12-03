import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { BcryptService } from '@/bcrypt/bcrypt.service'
import { PrismaService } from '@/prisma/prisma.service'
import { RegisterDto } from '@/auth/dto/register.dto'

import type { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  async register(data: RegisterDto) {
    const hashedPassword = await this.bcryptService.hash(data.password)

    return this.prismaService.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    })
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id }

    return {
      token: this.jwtService.sign(payload),
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    const isValid = await this.bcryptService.compare(password, user.password)

    if (!isValid) {
      return null
    }

    return user
  }
}
