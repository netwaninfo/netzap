import { Module } from '@nestjs/common'

import { UsersRepository } from '@/domain/users/application/repositories/users-repository'
import { PrismaUsersRepository } from './repositories/prisma-users-repository'

@Module({
  providers: [
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class PrismaUsersRepositories {}
