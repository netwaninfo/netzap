import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Instance } from '@/domain/chat/enterprise/entities/instance'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { Instance as PrismaInstance } from '@prisma/client'

type Raw = PrismaInstance

export class PrismaInstanceMapper {
  static toDomain(raw: Raw): Instance {
    const attendantId = raw.attendantIds[0]

    if (!attendantId) throw new InvalidResourceFormatError({ id: raw.id })

    return Instance.create(
      {
        name: raw.name,
        phone: raw.phone,
        status: raw.status,
        attendantId: UniqueEntityID.create(attendantId),
      },
      UniqueEntityID.create(raw.id)
    )
  }
}
