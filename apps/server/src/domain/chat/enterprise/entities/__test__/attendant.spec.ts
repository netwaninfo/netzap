import { makeUniqueEntityID } from '@/test/factories/make-unique-entity-id'
import { faker } from '@/test/lib/faker'
import { Attendant } from '../attendant'

describe('Attendant', () => {
	it('should be able to create', () => {
		const attendant = Attendant.create({
			email: faker.internet.email(),
			name: faker.person.fullName(),
			instanceId: makeUniqueEntityID(),
		})

		expect(attendant).toBeTruthy()
	})
})
