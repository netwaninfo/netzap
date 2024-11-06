import { Module } from '@nestjs/common'
import { PrismaChatRepositories } from './chat/prisma-chat-repositories.module'
import { PrismaManagementRepositories } from './management/prisma-management-repositories.module'
import { PrismaService } from './prisma.service'
import { PrismaUsersRepositories } from './users/prisma-users-repositories.module'

@Module({
  imports: [
    PrismaManagementRepositories,
    PrismaChatRepositories,
    PrismaUsersRepositories,
  ],
  providers: [PrismaService],
  exports: [
    PrismaService,
    PrismaManagementRepositories,
    PrismaChatRepositories,
    PrismaUsersRepositories,
  ],
})
export class PrismaModule {}
