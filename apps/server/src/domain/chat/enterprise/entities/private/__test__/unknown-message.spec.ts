import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { PrivateUnknownMessage } from '../unknown-message.js'

describe('PrivateUnknownMessage', () => {
  it('should be able to create', () => {
    const message = PrivateUnknownMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      payload: {
        data: true,
      },
    })

    expect(message).toBeTruthy()
  })
})
