import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { BcryptModule } from '@/bcrypt/bcrypt.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { AuthService } from '@/auth/auth.service'
import { AuthController } from '@/auth/auth.controller'
import { LocalStrategy } from '@/auth/strategy/local.strategy'
import { JwtStrategy } from '@/auth/strategy/jwt.strategy'
import { JWT_SECRET_KEY } from '@/config/secrets'

@Module({
  imports: [
    PrismaModule,
    BcryptModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
