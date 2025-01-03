import {
  Injectable,
  type OnModuleDestroy,
  type OnModuleInit,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { EnvService } from '@/infra/env/env.service.js'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private env: EnvService) {
    const isDevelopment = env.get('NODE_ENV') === 'development'

    super({
      ...(isDevelopment && { log: ['warn', 'error'] }),
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
