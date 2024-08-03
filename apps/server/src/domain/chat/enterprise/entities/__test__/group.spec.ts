import { faker } from '@faker-js/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { Group } from '../group'

describe('Group', () => {
	it('should be able to create', () => {
		const group = Group.create({
			name: faker.person.firstName(),
			waId: makeWAEntityID(),
		})

		expect(group).toBeTruthy()
	})
})
