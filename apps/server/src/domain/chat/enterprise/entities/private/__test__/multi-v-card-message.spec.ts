import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { each } from '@/test/utilities/each.js'
import { PrivateMultiVCardMessage } from '../multi-v-card-message.js'

describe('PrivateMultiVCardMessage', () => {
  it('should be able to create', () => {
    const message = PrivateMultiVCardMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      contacts: each().map(() => makeContact()),
    })

    expect(message).toBeTruthy()
  })
})
