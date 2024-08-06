import { faker } from '@/test/lib/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { Group } from '../group'

describe('Group', () => {
	it('should be able to create', () => {
		const group = Group.create({
			name: faker.person.firstName(),
			waId: makeWAEntityID(),
			instanceId: makeUniqueEntityID(),
		})

		expect(group).toBeTruthy()
	})
})
