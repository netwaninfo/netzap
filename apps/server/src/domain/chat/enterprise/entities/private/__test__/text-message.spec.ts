import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { faker } from '@/test/lib/faker'
import { PrivateTextMessage } from '../text-message'

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
