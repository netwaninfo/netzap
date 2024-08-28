import { UsersRepositories } from '@/domain/auth/application/repositories/users-repositories'
import { Module } from '@nestjs/common'
import { ClerkService } from './clerk.service'
import { ClerkUsersRepository } from './repositories/clerk-users-repository'

@Module({
	providers: [
		ClerkService,
		{
			provide: UsersRepositories,
			useClass: ClerkUsersRepository,
		},
	],
	exports: [ClerkService, UsersRepositories],
})
export class ClerkModule {}
