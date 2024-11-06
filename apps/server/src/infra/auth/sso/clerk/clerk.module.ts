import { UsersRepository } from '@/domain/auth/application/repositories/users-repository'
import { Module } from '@nestjs/common'
import { ClerkService } from './clerk.service'
import { ClerkUsersRepository } from './repositories/clerk-users-repository'

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
