import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeWAGroupMessage } from '@/test/factories/chat/wa/make-wa-group-message.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { WAGroupMessage } from '../message.js'

describe('WAGroupMessage', () => {
  it('should be able to create', () => {
    const waMessage = WAGroupMessage.create(
      {
        ack: 'pending',
        body: faker.lorem.paragraph(),
        waChatId: makeWAEntityID(),
        instanceId: makeUniqueEntityID(),
        isForwarded: faker.datatype.boolean(),
        isFromMe: faker.datatype.boolean(),
        timestamp: Date.now(),
        type: 'text',
        contacts: [makeWAPrivateContact()],
        media: makeWAMessageMedia(),
        quoted: makeWAGroupMessage(),
        author: makeWAPrivateContact(),
        raw: {},
      },
      makeWAMessageID()
    )

    expect(waMessage).toBeTruthy()
  })
})
