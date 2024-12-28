import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  Instance,
  type InstanceProps,
} from '@/domain/management/enterprise/entities/instance.js'
import { faker } from '@/test/lib/faker.js'

export function makeInstance(
  override: Partial<InstanceProps> = {},
  id?: UniqueEntityID
) {
  return Instance.create(
    {
      name: faker.company.name(),
      phone: faker.phone.number(),
      ...override,
    },
    id
  )
}
