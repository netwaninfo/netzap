import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { faker } from '@faker-js/faker'

export function makeWAEntityID(override?: string) {
	return WAEntityID.createFromString(
		override ?? faker.helpers.fromRegExp(/[0-9]{13}@(c\.us|g\.us)/),
	)
}
