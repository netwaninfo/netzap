import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { GroupRevokedMessage } from '../revoked-message'

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
