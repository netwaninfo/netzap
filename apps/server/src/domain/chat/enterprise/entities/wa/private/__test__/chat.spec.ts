import { faker } from '@/test/lib/faker.js'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { WAPrivateChat } from '../chat.js'

describe('WAPrivateChat', () => {
  it('should be able to create', () => {
    const waChat = WAPrivateChat.create(
      {
        name: faker.person.firstName(),
        timestamp: Date.now(),
        unreadCount: faker.number.int({ max: 99 }),
        imageUrl: faker.internet.url(),
        contact: makeWAPrivateContact(),
        instanceId: makeUniqueEntityID(),
      },
      makeWAEntityID()
    )

    expect(waChat).toBeTruthy()
  })
})
