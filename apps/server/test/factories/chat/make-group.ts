import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Group, type GroupProps } from '@/domain/chat/enterprise/entities/group'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../make-unique-entity-id'
import { makeWAEntityID } from './value-objects/make-wa-entity-id'

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
