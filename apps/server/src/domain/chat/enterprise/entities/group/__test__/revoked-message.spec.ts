import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { GroupRevokedMessage } from '../revoked-message.js'

describe('GroupRevokedMessage', () => {
  it('should be able to create', () => {
    const message = GroupRevokedMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      author: makeContact(),
    })

    expect(message).toBeTruthy()
  })
})
