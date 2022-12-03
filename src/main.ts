import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import { FastifyAdapter } from '@nestjs/platform-fastify'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, new FastifyAdapter())
  await app.listen(3000)
}

bootstrap()
