import { faker } from '@/test/lib/faker'
import { Instance } from '../instance'

describe('Instance', () => {
	it('should be able to create', () => {
		const instance = Instance.create({
			name: faker.company.name(),
			phone: faker.phone.number(),
			status: 'stopped',
		})

		expect(instance).toBeTruthy()
	})
})
