import { makeContact } from '@/test/factories/chat/make-contact'
import { makeMessageMedia } from '@/test/factories/chat/make-message-media'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { GroupAudioMessage } from '../group-audio-message'

describe('GroupAudioMessage', () => {
	it('should be able to create', () => {
		const message = GroupAudioMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waId: makeWAMessageID(),
			media: makeMessageMedia(),
			author: makeContact(),
		})

		expect(message).toBeTruthy()
	})
})
