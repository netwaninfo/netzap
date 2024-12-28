import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { PrivateTextMessage } from '../text-message.js'

describe('PrivateTextMessage', () => {
  it('should be able to create', () => {
    const message = PrivateTextMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      body: faker.lorem.paragraph(),
    })

    expect(message).toBeTruthy()
  })
})
