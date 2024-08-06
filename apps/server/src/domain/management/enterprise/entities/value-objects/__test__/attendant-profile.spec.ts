import { faker } from '@/test/lib/faker'

import { AttendantProfile } from '../attendant-profile'

describe('AttendantProfile', () => {
	it('should be able to create', () => {
		const profile = AttendantProfile.create({
			email: faker.internet.email(),
			name: faker.person.firstName(),
			displayName: faker.internet.userName(),
		})

		expect(profile).toBeTruthy()
	})
})
