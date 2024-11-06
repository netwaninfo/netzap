import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { User } from '@/domain/users/enterprise/entities/user'
import { UserInstanceList } from '@/domain/users/enterprise/entities/user-instance-list'
import { ClerkUser } from '@/infra/auth/sso/clerk/types/clerk-user'
import { Attendant } from '@prisma/client'
import { PickDeep } from 'type-fest'

type RawUser = Attendant & PickDeep<ClerkUser, 'name' | 'email'>

export class PrismaUserMapper {
  static toDomain(raw: RawUser): User {
    return User.create(
      {
        displayName: raw.displayName,
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
