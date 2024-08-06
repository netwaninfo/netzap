import { makeWAEntityID } from '@/test/factories/chat/value-objects/make-wa-entity-id'
import { faker } from '@/test/lib/faker'
import { WAGroupContact } from '../contact'

describe('WAGroupContact', () => {
	it('should be able to create', () => {
		const waContact = WAGroupContact.create(
			{
				name: faker.person.fullName(),
				shortName: faker.person.firstName(),
				pushName: faker.person.lastName(),
				number: faker.helpers.fromRegExp(/[0-9]{13}/),
				imageUrl: faker.internet.url(),
				formattedNumber: faker.phone.number(),
			},
			makeWAEntityID(),
		)

		expect(waContact).toBeTruthy()
	})
})
