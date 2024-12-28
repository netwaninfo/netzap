import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  Attendant,
  type AttendantProps,
} from '@/domain/chat/enterprise/entities/attendant.js'
import { faker } from '@/test/lib/faker.js'

export const makeAttendant = (
  override: Partial<AttendantProps> = {},
  id?: UniqueEntityID
) => {
  const attendant = Attendant.create(
    {
      displayName: faker.internet.username(),
      ...override,
    },
    id
  )

  return attendant
}
