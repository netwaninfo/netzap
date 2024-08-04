import {
	VCardContact,
	type VCardContactProps,
} from '@/domain/chat/enterprise/entities/value-objects/v-card-contact'
import { faker } from '@/test/lib/faker'
import { makeWAEntityID } from './make-wa-entity-id'

export function makeVCardContact(override: Partial<VCardContactProps> = {}) {
	return VCardContact.create({
		name: faker.person.firstName(),
		waId: makeWAEntityID(),
		phone: faker.phone.number(),
		...override,
	})
}
