import { makeContact } from '@/test/factories/chat/make-contact'
import { makeVCardContact } from '@/test/factories/chat/value-objects/make-v-card-contact'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAMessageID } from '@/test/factories/chat/value-objects/make-wa-message-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { each } from '@/test/utilities/each'
import { GroupMultiVCardMessage } from '../group-multi-v-card-message'

describe('GroupMultiVCardMessage', () => {
	it('should be able to create', () => {
		const message = GroupMultiVCardMessage.create({
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waId: makeWAMessageID(),
			contacts: each().map(() => makeVCardContact()),
			author: makeContact(),
		})

		expect(message).toBeTruthy()
	})
})
