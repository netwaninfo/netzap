import { faker } from '@/test/lib/faker'
import { Attendant } from '../attendant'

describe('Attendant', () => {
	it('should be able to create', () => {
		const attendant = Attendant.create({
			email: faker.internet.email(),
			name: faker.person.fullName(),
		})

		expect(attendant).toBeTruthy()
	})
})
