import { Module } from '@nestjs/common'

import { UsersRepository } from '@/domain/users/application/repositories/users-repository.js'
import { PrismaUsersRepository } from './repositories/prisma-users-repository.js'

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
