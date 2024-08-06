import { makeMessageMedia } from '@/test/factories/chat/make-message-media'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { PrivateAudioMessage } from '../audio-message'

describe('PrivateAudioMessage', () => {
	it('should be able to create', () => {
		const message = PrivateAudioMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waId: makeWAMessageID(),
			media: makeMessageMedia(),
		})

		expect(message).toBeTruthy()
	})
})