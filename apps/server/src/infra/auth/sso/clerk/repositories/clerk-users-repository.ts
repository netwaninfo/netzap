import {
	UsersRepositories,
	UsersRepositoriesFindManyByIdsParams,
	UsersRepositoriesFindUniqueByIdParams,
} from '@/domain/auth/application/repositories/users-repositories'
import { User } from '@/domain/auth/enterprise/entities/user'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { User as RawClerkUser } from '@clerk/clerk-sdk-node'
import { Injectable } from '@nestjs/common'
import { ClerkService } from '../clerk.service'
import { ClerkUserMapper } from '../mappers/clerk-user-mapper'
import { ClerkUser, ClerkUserPrivateMetadata } from '../types/clerk-user'

@Injectable()
export class ClerkUsersRepository implements UsersRepositories {
	constructor(private clerk: ClerkService) {}

	private checkIsValidClerkUser(user: RawClerkUser): ClerkUser {
		const email = user.primaryEmailAddress?.emailAddress
		const name = user.firstName || user.lastName || user.fullName

		const privateMetadata =
			user.privateMetadata as unknown as ClerkUserPrivateMetadata
		const internalId = privateMetadata.applications.netzap?.id

		if (!email || !name || !internalId) {
			throw new InvalidResourceFormatError({ id: user.id })
		}

		return {
			id: user.id,
			email,
			name,
			internalId,
		}
	}

	async findUniqueById({
		userId,
	}: UsersRepositoriesFindUniqueByIdParams): Promise<User | null> {
		try {
			const raw = await this.clerk.client.users.getUser(userId.toString())

			return ClerkUserMapper.toDomain(this.checkIsValidClerkUser(raw))
		} catch {
			return null
		}
	}

	async findManyByIds({
		userIds,
	}: UsersRepositoriesFindManyByIdsParams): Promise<User[]> {
		if (!userIds.length) return []

		try {
			const list = await this.clerk.client.users.getUserList({
				userId: userIds.map((id) => id.toString()),
				limit: 500,
			})

			return list.data.map((raw) =>
				ClerkUserMapper.toDomain(this.checkIsValidClerkUser(raw)),
			)
		} catch {
			return []
		}
	}
}
