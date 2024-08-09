import { faker } from '@/test/lib/faker'

import { makeContactPhone } from '@/test/factories/chat/value-objects/make-contact-phone'
import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { Contact } from '../contact'

describe('Contact', () => {
	it('should be able to create', () => {
		const contact = Contact.create({
			name: faker.person.firstName(),
			instanceId: makeUniqueEntityID(),
			waContactId: makeWAEntityID(),
			phone: makeContactPhone(),
		})

		expect(contact).toBeTruthy()
	})
})
