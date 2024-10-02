import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Group } from '@/domain/chat/enterprise/entities/group'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { Prisma, Group as Raw } from '@prisma/client'

export class PrismaGroupMapper {
  static toDomain(raw: Raw): Group {
    return Group.create({
      instanceId: UniqueEntityID.create(raw.instanceId),
      name: raw.name,
      waGroupId: WAEntityID.createFromString(raw.waGroupId),
      imageUrl: raw.imageUrl,
    })
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
