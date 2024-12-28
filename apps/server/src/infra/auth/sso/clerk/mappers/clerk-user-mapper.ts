import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { User } from '@/domain/auth/enterprise/entities/user.js'
import type { ClerkUser } from '../types/clerk-user.js'

export class ClerkUserMapper {
  static toDomain(raw: ClerkUser): User {
    return User.create(
      {
        email: raw.email,
        name: raw.name,
        imageUrl: raw.imageUrl,
        refId: UniqueEntityID.create(raw.id),
      },
      UniqueEntityID.create(raw.refId)
    )
  }
}
