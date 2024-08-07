import { faker } from '@/test/lib/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeWAGroupContact } from '@/test/factories/chat/wa/make-wa-group-contact'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { WAGroupChat } from '../chat'

describe('WAGroupChat', () => {
	it('should be able to create', () => {
		const waChat = WAGroupChat.create(
			{
				name: faker.person.firstName(),
				timestamp: Date.now(),
				unreadCount: faker.number.int({ max: 99 }),
				imageUrl: faker.internet.url(),
				contact: makeWAGroupContact(),
				instanceId: makeUniqueEntityID(),
			},
			makeWAEntityID(),
		)

		expect(waChat).toBeTruthy()
	})
})
