import { faker } from '@faker-js/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { Contact } from '../contact'

describe('Contact', () => {
	it('should be able to create', () => {
		const contact = Contact.create({
			name: faker.person.firstName(),
			instanceId: makeUniqueEntityID(),
			waId: makeWAEntityID(),
			phone: faker.phone.number(),
		})

		expect(contact).toBeTruthy()
	})
})
