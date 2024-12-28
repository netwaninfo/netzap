import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { PrivateRevokedMessage } from '../revoked-message.js'

describe('PrivateRevokedMessage', () => {
  it('should be able to create', () => {
    const message = PrivateRevokedMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
    })

    expect(message).toBeTruthy()
  })
})
