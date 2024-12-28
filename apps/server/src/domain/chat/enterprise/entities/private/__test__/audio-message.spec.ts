import { makeMessageMedia } from '@/test/factories/chat/make-message-media.js'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id.js'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id.js'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id.js'
import { PrivateAudioMessage } from '../audio-message.js'

describe('PrivateAudioMessage', () => {
  it('should be able to create', () => {
    const message = PrivateAudioMessage.create({
      chatId: makeUniqueEntityID(),
      instanceId: makeUniqueEntityID(),
      waChatId: makeWAEntityID(),
      waMessageId: makeWAMessageID(),
      media: makeMessageMedia(),
    })

    expect(message).toBeTruthy()
  })
})
