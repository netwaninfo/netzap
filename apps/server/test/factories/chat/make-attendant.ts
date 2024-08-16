import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	Attendant,
	type AttendantProps,
} from '@/domain/chat/enterprise/entities/attendant'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../make-unique-entity-id'

export const makeAttendant = (
	override: Partial<AttendantProps> = {},
	id?: UniqueEntityID,
) => {
	const attendant = Attendant.create(
		{
			email: faker.internet.email(),
			name: faker.person.firstName(),
			instanceId: makeUniqueEntityID(),
			...override,
		},
		id,
	)

	return attendant
}
