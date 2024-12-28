import { Prisma, type Group as PrismaGroup } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Group } from '@/domain/chat/enterprise/entities/group.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'

export type Raw = PrismaGroup

export class PrismaGroupMapper {
  static toDomain(raw: Raw): Group {
    return Group.create(
      {
        instanceId: UniqueEntityID.create(raw.instanceId),
        name: raw.name,
        waGroupId: WAEntityID.createFromString(raw.waGroupId),
        imageUrl: raw.imageUrl,
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrismaCreate(group: Group): Prisma.GroupUncheckedCreateInput {
    return {
      id: group.id.toString(),
      instanceId: group.instanceId.toString(),
      name: group.name,
      waGroupId: group.waGroupId.toString(),
      imageUrl: group.imageUrl,
    }
  }
}
