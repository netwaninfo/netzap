import { faker } from '@/test/lib/faker.js'

import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { PrivateChat } from '../chat.js'

describe('PrivateChat', () => {
  it('should be able to create', () => {
    const chat = PrivateChat.create({
      unreadCount: faker.number.int({ max: 99 }),
      contact: makeContact(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
    })

    expect(chat).toBeTruthy()
  })
})
