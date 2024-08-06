import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	Contact,
	type ContactProps,
} from '@/domain/chat/enterprise/entities/contact'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../make-unique-entity-id'
import { makeWAEntityID } from './value-objects/make-wa-entity-id'

export function makeContact(
	override: Partial<ContactProps> = {},
	id?: UniqueEntityID,
) {
	return Contact.create(
		{
			name: faker.person.firstName(),
			waId: makeWAEntityID(),
			phone: faker.phone.number(),
			instanceId: makeUniqueEntityID(),
			...override,
		},
		id,
	)
}
