import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { RevokedMessage } from '../revoked-message'

describe('RevokedMessage', () => {
	it('should be able to create', () => {
		const message = RevokedMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waId: makeWAMessageID(),
		})

		expect(message).toBeTruthy()
	})
})
