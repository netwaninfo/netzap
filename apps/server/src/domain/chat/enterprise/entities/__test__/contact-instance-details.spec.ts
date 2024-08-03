import { faker } from '@faker-js/faker'

import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { ContactInstanceDetails } from '../contact-instance-details'

describe('ContactInstanceDetails', () => {
	it('should be able to create', () => {
		const details = ContactInstanceDetails.create({
			contactId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			isMyContact: faker.datatype.boolean(),
		})

		expect(details).toBeTruthy()
	})
})
