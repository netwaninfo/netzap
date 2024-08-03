import { makeAttendantProfile } from '@/test/factories/management/value-objects/make-attendant-profile'
import { Attendant } from '../attendant'

describe('Attendant', () => {
	it('should be able to create', () => {
		const attendant = Attendant.create({
			profile: makeAttendantProfile(),
		})

		expect(attendant).toBeTruthy()
	})

	it('should be able to check has password', () => {
		const attendant = Attendant.create({
			profile: makeAttendantProfile(),
			password: '12345',
		})

		expect(attendant.hasPassword()).toBe(true)
	})
})
