import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Instance,
  InstanceProps,
} from '@/domain/chat/enterprise/entities/instance'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../make-unique-entity-id'

export function makeInstance(
  override: Partial<InstanceProps> = {},
  id?: UniqueEntityID
) {
  return Instance.create(
    {
      name: faker.company.name(),
      phone: faker.phone.number(),
      attendantId: makeUniqueEntityID(),
      status: faker.helpers.arrayElement([
        'stopped',
        'starting',
        'initialized',
        'failed',
        'connected',
        'disconnected',
      ]),
      ...override,
    },
    id
  )
}
