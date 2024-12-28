import { Module } from '@nestjs/common'

import { PrismaChatRepositories } from './chat/prisma-chat-repositories.module.js'
import { PrismaManagementRepositories } from './management/prisma-management-repositories.module.js'
import { PrismaService } from './prisma.service.js'
import { PrismaUsersRepositories } from './users/prisma-users-repositories.module.js'

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
