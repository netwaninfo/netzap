import { Module } from '@nestjs/common'

import { InstancesRepository } from '@/domain/management/application/repositories/instances-repository.js'
import { PrismaInstancesRepository } from './repositories/prisma-instances-repository.js'

@Module({
  providers: [
    {
      provide: InstancesRepository,
      useClass: PrismaInstancesRepository,
    },
  ],
  exports: [InstancesRepository],
})
export class PrismaManagementRepositories {}
