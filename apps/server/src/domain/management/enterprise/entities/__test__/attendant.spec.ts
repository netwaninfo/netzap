import { makeAttendantProfile } from '@/test/factories/management/value-objects/make-attendant-profile'
import { Attendant } from '../attendant'

describe('Attendant', () => {
	it('should be able to create', () => {
		const attendant = Attendant.create({
			profile: makeAttendantProfile(),
		})

		expect(attendant).toBeTruthy()
	})
})
