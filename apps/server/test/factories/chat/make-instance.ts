import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  Instance,
  type InstanceProps,
} from '@/domain/chat/enterprise/entities/instance.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../make-unique-entity-id.js'

export function makeInstance(
  override: Partial<InstanceProps> = {},
  id?: UniqueEntityID
) {
  return Instance.create(
    {
      name: faker.company.name(),
      phone: faker.phone.number(),
      attendantId: makeUniqueEntityID(),
      status: faker.helpers.arrayElement(['connected', 'disconnected']),
      state: faker.helpers.arrayElement([
        'stopped',
        'starting',
        'initialized',
        'failed',
      ]),
      ...override,
    },
    id
  )
}
