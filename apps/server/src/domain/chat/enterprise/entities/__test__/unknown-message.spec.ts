import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { UnknownMessage } from '../unknown-message'

describe('UnknownMessage', () => {
	it('should be able to create', () => {
		const message = UnknownMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waId: makeWAMessageID(),
			payload: {
				data: true,
			},
		})

		expect(message).toBeTruthy()
	})
})
