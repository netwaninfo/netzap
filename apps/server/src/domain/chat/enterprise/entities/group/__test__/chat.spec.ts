import { faker } from '@/test/lib/faker.js'

import { makeGroup } from '@/test/factories/chat/make-group.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { GroupChat } from '../chat.js'

describe('GroupChat', () => {
  it('should be able to create', () => {
    const chat = GroupChat.create({
      unreadCount: faker.number.int({ max: 99 }),
      group: makeGroup(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
    })

    expect(chat).toBeTruthy()
  })
})
