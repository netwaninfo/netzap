import { faker } from '@faker-js/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { GroupChat } from '../group-chat'

describe('GroupChat', () => {
	it('should be able to create', () => {
		const chat = GroupChat.create({
			unreadCount: faker.number.int({ max: 99 }),
			groupId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waId: makeWAEntityID(),
		})

		expect(chat).toBeTruthy()
	})
})
