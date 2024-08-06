import {
	AttendantProfile,
	type AttendantProfileProps,
} from '@/domain/management/enterprise/entities/value-objects/attendant-profile'
import { faker } from '@/test/lib/faker'

export const makeAttendantProfile = (
	override: Partial<AttendantProfileProps> = {},
) => {
	return AttendantProfile.create({
		name: faker.person.firstName(),
		email: faker.internet.email(),
		displayName: faker.internet.userName(),
		...override,
	})
}
