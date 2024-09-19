import { Module } from '@nestjs/common'
import { PrismaChatRepositories } from './chat/prisma-chat-repositories.module'
import { PrismaManagementRepositories } from './management/prisma-management-repositories.module'
import { PrismaService } from './prisma.service'

@Module({
  imports: [PrismaManagementRepositories, PrismaChatRepositories],
  providers: [PrismaService],
  exports: [
    PrismaService,
    PrismaManagementRepositories,
    PrismaChatRepositories,
  ],
})
export class PrismaModule {}
