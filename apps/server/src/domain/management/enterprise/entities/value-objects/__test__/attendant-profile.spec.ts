import { faker } from '@faker-js/faker'

import { AttendantProfile } from '../attendant-profile'

describe('Attendant Profile', () => {
	it('should be able to create', () => {
		const profile = AttendantProfile.create({
			email: faker.internet.email(),
			name: faker.person.firstName(),
			displayName: faker.internet.userName(),
		})

		expect(profile).toBeTruthy()
	})
})
