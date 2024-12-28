import type { Prisma, Instance as RawInstance } from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Instance } from '@/domain/management/enterprise/entities/instance.js'

export class PrismaInstanceMapper {
  static toDomain(raw: RawInstance): Instance {
    return Instance.create(
      {
        name: raw.name,
        phone: raw.phone,
        qrCode: raw.qrCode,
        status: raw.status,
        state: raw.state,
      },
      UniqueEntityID.create(raw.id)
    )
  }

  static toPrisma(instance: Instance): Prisma.InstanceUncheckedCreateInput {
    return {
      name: instance.name,
      phone: instance.phone,
      qrCode: instance.qrCode,
      status: instance.status,
      state: instance.state,
    }
  }
}
