import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attendant } from '@/domain/chat/enterprise/entities/attendant'
import { Attendant as PrismaAttendant } from '@prisma/client'

type Raw = PrismaAttendant

export class PrismaAttendantMapper {
  static toDomain(raw: Raw): Attendant {
    return Attendant.create(
      { displayName: raw.displayName },
      UniqueEntityID.create(raw.id)
    )
  }
}
