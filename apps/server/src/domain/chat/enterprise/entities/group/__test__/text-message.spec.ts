import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { faker } from '@/test/lib/faker.js'
import { GroupTextMessage } from '../text-message.js'

describe('GroupTextMessage', () => {
  it('should be able to create', () => {
    const message = GroupTextMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      author: makeContact(),
      body: faker.lorem.paragraph(),
    })

    expect(message).toBeTruthy()
  })
})
