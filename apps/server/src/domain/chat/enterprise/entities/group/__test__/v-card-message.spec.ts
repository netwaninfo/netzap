import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { GroupVCardMessage } from '../v-card-message'

describe('GroupVCardMessage', () => {
  it('should be able to create', () => {
    const message = GroupVCardMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      contact: makeContact(),
      author: makeContact(),
    })

    expect(message).toBeTruthy()
  })
})
