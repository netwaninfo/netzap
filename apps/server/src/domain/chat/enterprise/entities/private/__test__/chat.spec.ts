import { faker } from '@/test/lib/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { PrivateChat } from '../chat'

describe('PrivateChat', () => {
	it('should be able to create', () => {
		const chat = PrivateChat.create({
			unreadCount: faker.number.int({ max: 99 }),
			contactId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
		})

		expect(chat).toBeTruthy()
	})
})
