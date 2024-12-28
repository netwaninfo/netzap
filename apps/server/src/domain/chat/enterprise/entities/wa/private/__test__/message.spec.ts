import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact.js'
import { makeWAPrivateMessage } from '@/test/factories/chat/wa/make-wa-private-message.js'
import { makeWAMessageMedia } from '@/test/factories/chat/wa/value-objects/make-wa-message-media.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { WAPrivateMessage } from '../message.js'

describe('WAPrivateMessage', () => {
  it('should be able to create', () => {
    const waMessage = WAPrivateMessage.create(
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
        quoted: makeWAPrivateMessage(),
        raw: {},
      },
      makeWAMessageID()
    )

    expect(waMessage).toBeTruthy()
  })
})
