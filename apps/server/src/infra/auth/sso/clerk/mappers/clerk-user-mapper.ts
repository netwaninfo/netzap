import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/auth/enterprise/entities/user'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { User as Raw } from '@clerk/clerk-sdk-node'

export class ClerkUserMapper {
	static toDomain(raw: Raw): User {
		const email = raw.primaryEmailAddress?.emailAddress
		const name = raw.firstName || raw.lastName || raw.fullName

		if (!email || !name) {
			throw new InvalidResourceFormatError({ id: raw.id })
		}

		return User.create(
			{
				email,
				name,
			},
			UniqueEntityID.create(raw.id),
		)
	}
}
