import { makeContact } from '@/test/factories/chat/make-contact'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { each } from '@/test/utilities/each'
import { PrivateMultiVCardMessage } from '../multi-v-card-message'

describe('PrivateMultiVCardMessage', () => {
	it('should be able to create', () => {
		const message = PrivateMultiVCardMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			contacts: each().map(() => makeContact()),
		})

		expect(message).toBeTruthy()
	})
})
