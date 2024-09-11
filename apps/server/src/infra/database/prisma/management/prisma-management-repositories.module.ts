import { InstancesRepository } from '@/domain/management/application/repositories/instances-repository'
import { Module } from '@nestjs/common'
import { PrismaInstancesRepository } from './repositories/prisma-instances-repository'

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
