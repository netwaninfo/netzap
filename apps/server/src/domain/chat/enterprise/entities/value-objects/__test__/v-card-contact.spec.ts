import { faker } from '@faker-js/faker'

import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { VCardContact } from '../v-card-contact'

describe('VCardContact', () => {
	it('should be able to create', () => {
		const contact = VCardContact.create({
			name: faker.person.firstName(),
			waId: makeWAEntityID(),
			phone: faker.phone.number(),
		})

		expect(contact).toBeTruthy()
	})
})
