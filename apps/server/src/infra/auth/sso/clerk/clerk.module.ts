import { Module } from '@nestjs/common'

import { UsersRepository } from '@/domain/auth/application/repositories/users-repository.js'

import { ClerkService } from './clerk.service.js'
import { ClerkUsersRepository } from './repositories/clerk-users-repository.js'

@Module({
  providers: [
    ClerkService,
    {
      provide: UsersRepository,
      useClass: ClerkUsersRepository,
    },
  ],
  exports: [ClerkService, UsersRepository],
})
export class ClerkModule {}
