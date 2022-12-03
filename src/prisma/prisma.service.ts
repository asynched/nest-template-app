import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger('PrismaService')

  async onModuleInit() {
    this.logger.log('Connecting to the database')
    await this.$connect()
    this.logger.log('Connected to the database')
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from the database')
    await this.$disconnect()
    this.logger.log('Disconnected from the database')
  }
}
