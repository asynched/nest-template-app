import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { registerSchema } from '@/auth/dto/register.dto'
import { ZodPipe } from '@/pipes/zod.pipe'
import { AuthService } from '@/auth/auth.service'
import { LocalAuthGuard } from '@/auth/guards/local.guard'

import type { RegisterDto } from '@/auth/dto/register.dto'

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request: any) {
    return this.authService.login(request.user)
  }

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body(new ZodPipe(registerSchema)) data: RegisterDto) {
    await this.authService.register(data)

    return {
      message: 'User created successfully',
    }
  }
}
