import type { Attendant as PrismaAttendant } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Attendant } from '@/domain/chat/enterprise/entities/attendant.js'

type Raw = PrismaAttendant

export class PrismaAttendantMapper {
  static toDomain(raw: Raw): Attendant {
    return Attendant.create(
      { displayName: raw.displayName },
      UniqueEntityID.create(raw.id)
    )
  }
}
