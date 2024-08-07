import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import {
	WAPrivateContact,
	type WAPrivateContactProps,
} from '@/domain/chat/enterprise/entities/wa/private/contact'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'

export const makeWAPrivateContact = (
	override: Partial<WAPrivateContactProps> = {},
	id: WAEntityID = makeWAEntityID(),
) => {
	return WAPrivateContact.create(
		{
			instanceId: makeUniqueEntityID(),
			name: faker.person.fullName(),
			shortName: faker.person.firstName(),
			pushName: faker.person.lastName(),
			number: faker.helpers.fromRegExp(/[0-9]{13}/),
			imageUrl: faker.internet.url(),
			formattedNumber: faker.phone.number(),
			isBusiness: faker.datatype.boolean(),
			isEnterprise: faker.datatype.boolean(),
			isMyContact: faker.datatype.boolean(),
			isWAContact: faker.datatype.boolean(),
			...override,
		},
		id,
	)
}
