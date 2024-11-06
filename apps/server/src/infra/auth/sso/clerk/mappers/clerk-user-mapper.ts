import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/auth/enterprise/entities/user'
import { ClerkUser } from '../types/clerk-user'

export class ClerkUserMapper {
  static toDomain(raw: ClerkUser): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        refId: UniqueEntityID.create(raw.id),
      },
      UniqueEntityID.create(raw.refId)
    )
  }
}
