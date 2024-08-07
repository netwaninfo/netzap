import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { GroupUnknownMessage } from '../unknown-message'

describe('GroupUnknownMessage', () => {
	it('should be able to create', () => {
		const message = GroupUnknownMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			payload: {
				data: true,
			},
			author: makeContact(),
		})

		expect(message).toBeTruthy()
	})
})
