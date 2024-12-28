import type { Attendant } from '@prisma/client'
import type { PickDeep } from 'type-fest'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { UserInstanceList } from '@/domain/users/enterprise/entities/user-instance-list.js'
import { User } from '@/domain/users/enterprise/entities/user.js'
import type { ClerkUser } from '@/infra/auth/sso/clerk/types/clerk-user.js'

type RawUser = Attendant & PickDeep<ClerkUser, 'name' | 'email' | 'imageUrl'>

export class PrismaUserMapper {
  static toDomain(raw: RawUser): User {
    return User.create(
      {
        displayName: raw.displayName,
        imageUrl: raw.imageUrl,
        email: raw.email,
        name: raw.name,
        instances: UserInstanceList.create(
          raw.instanceIds.map(instanceId => UniqueEntityID.create(instanceId))
        ),
        refId: UniqueEntityID.create(raw.refId),
      },
      UniqueEntityID.create(raw.id)
    )
  }
}
