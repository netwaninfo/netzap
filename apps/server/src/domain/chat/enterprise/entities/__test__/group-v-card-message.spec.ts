import { makeContact } from '@/test/factories/chat/make-contact'
import { makeVCardContact } from '@/test/factories/chat/value-objects/make-v-card-contact'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { GroupVCardMessage } from '../group-v-card-message'

describe('GroupVCardMessage', () => {
	it('should be able to create', () => {
		const message = GroupVCardMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waId: makeWAMessageID(),
			contact: makeVCardContact(),
			author: makeContact(),
		})

		expect(message).toBeTruthy()
	})
})
