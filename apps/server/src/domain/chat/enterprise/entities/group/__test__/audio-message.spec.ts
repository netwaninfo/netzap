import { makeContact } from '@/test/factories/chat/make-contact.js'
import { makeMessageMedia } from '@/test/factories/chat/make-message-media.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { GroupAudioMessage } from '../audio-message.js'

describe('GroupAudioMessage', () => {
  it('should be able to create', () => {
    const message = GroupAudioMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      media: makeMessageMedia(),
      author: makeContact(),
    })

    expect(message).toBeTruthy()
  })
})
