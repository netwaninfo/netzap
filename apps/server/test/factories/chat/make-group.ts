import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import {
  Group,
  type GroupProps,
} from '@/domain/chat/enterprise/entities/group.js'
import { faker } from '@/test/lib/faker.js'
import { makeUniqueEntityID } from '../make-unique-entity-id.js'
import { makeWAEntityID } from './value-objects/make-wa-entity-id.js'

export function makeGroup(
  override: Partial<GroupProps> = {},
  id?: UniqueEntityID
) {
  return Group.create(
    {
      name: faker.person.firstName(),
      waGroupId: makeWAEntityID(),
      instanceId: makeUniqueEntityID(),
      ...override,
    },
    id
  )
}
