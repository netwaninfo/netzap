import {
	WAEntityID,
	type WAEntityIDProps,
	type WAEntityNode,
} from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { faker } from '@faker-js/faker'

export function makeWAEntityID(override: Partial<WAEntityIDProps> = {}) {
	return WAEntityID.create({
		node: faker.helpers.arrayElement<WAEntityNode>(['c.us', 'g.us', 'lid']),
		ref: faker.helpers.fromRegExp(/[0-9]{13}/),
		...override,
	})
}
