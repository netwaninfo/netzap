import type { $Enums } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Instance } from '@/domain/chat/enterprise/entities/instance.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'

type Raw = {
  id: string
  name: string
  phone: string
  status: $Enums.InstanceStatus
  state: $Enums.InstanceState
  attendantIds: string[]
}

export class PrismaInstanceMapper {
  static toDomain(raw: Raw): Instance {
    const attendantId = raw.attendantIds[0]

    if (!attendantId) throw new InvalidResourceFormatError({ id: raw.id })

    return Instance.create(
      {
        name: raw.name,
        phone: raw.phone,
        status: raw.status,
        state: raw.state,
        attendantId: UniqueEntityID.create(attendantId),
      },
      UniqueEntityID.create(raw.id)
    )
  }
}
