import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { PrivateRevokedMessage } from '../revoked-message'

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
