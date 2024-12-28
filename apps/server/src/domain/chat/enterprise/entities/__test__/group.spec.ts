import { faker } from '@/test/lib/faker.js'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { Group } from '../group.js'

describe('Group', () => {
  it('should be able to create', () => {
    const group = Group.create({
      name: faker.person.firstName(),
      waGroupId: makeWAEntityID(),
      instanceId: makeUniqueEntityID(),
    })

    expect(group).toBeTruthy()
  })
})
