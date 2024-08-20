import {
	UsersRepositories,
	UsersRepositoriesFindUniqueByIdParams,
} from '@/domain/auth/application/repositories/users-repositories'
import { User } from '@/domain/auth/enterprise/entities/user'
import { Injectable } from '@nestjs/common'
import { ClerkService } from '../clerk.service'
import { ClerkUserMapper } from '../mappers/clerk-user-mapper'

@Injectable()
export class ClerkUsersRepository implements UsersRepositories {
	constructor(private clerk: ClerkService) {}

	async findUniqueById({
		userId,
	}: UsersRepositoriesFindUniqueByIdParams): Promise<User | null> {
		try {
			const raw = await this.clerk.client.users.getUser(userId.toString())

			return ClerkUserMapper.toDomain(raw)
		} catch (error) {
			return null
		}
	}
}
