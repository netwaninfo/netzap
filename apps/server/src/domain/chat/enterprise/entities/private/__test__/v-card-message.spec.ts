import { makeVCardContact } from '@/test/factories/chat/value-objects/make-v-card-contact'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { PrivateVCardMessage } from '../v-card-message'

describe('PrivateVCardMessage', () => {
	it('should be able to create', () => {
		const message = PrivateVCardMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waId: makeWAMessageID(),
			contact: makeVCardContact(),
		})

		expect(message).toBeTruthy()
	})
})
