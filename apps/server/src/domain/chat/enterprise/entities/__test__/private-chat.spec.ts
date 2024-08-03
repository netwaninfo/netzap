import { faker } from '@faker-js/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { PrivateChat } from '../private-chat'

describe('PrivateChat', () => {
	it('should be able to create', () => {
		const chat = PrivateChat.create({
			unreadCount: faker.number.int({ max: 99 }),
			contactId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waId: makeWAEntityID(),
		})

		expect(chat).toBeTruthy()
	})
})
