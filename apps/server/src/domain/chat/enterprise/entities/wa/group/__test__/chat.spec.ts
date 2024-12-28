import { faker } from '@/test/lib/faker.js'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAGroupContact } from '@/test/factories/chat/wa/make-wa-group-contact.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { WAGroupChat } from '../chat.js'

describe('WAGroupChat', () => {
  it('should be able to create', () => {
    const waChat = WAGroupChat.create(
      {
        name: faker.person.firstName(),
        timestamp: Date.now(),
        unreadCount: faker.number.int({ max: 99 }),
        imageUrl: faker.internet.url(),
        contact: makeWAGroupContact(),
        instanceId: makeUniqueEntityID(),
        participants: [makeWAPrivateContact()],
      },
      makeWAEntityID()
    )

    expect(waChat).toBeTruthy()
  })
})
