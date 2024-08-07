import { faker } from '@/test/lib/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAPrivateContact } from '@/test/factories/chat/wa/make-wa-private-contact'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { WAPrivateChat } from '../chat'

describe('WAPrivateChat', () => {
	it('should be able to create', () => {
		const waChat = WAPrivateChat.create(
			{
				name: faker.person.firstName(),
				timestamp: Date.now(),
				unreadCount: faker.number.int({ max: 99 }),
				imageUrl: faker.internet.url(),
				contact: makeWAPrivateContact(),
				instanceId: makeUniqueEntityID(),
			},
			makeWAEntityID(),
		)

		expect(waChat).toBeTruthy()
	})
})
