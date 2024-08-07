import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	Instance,
	type InstanceProps,
} from '@/domain/management/enterprise/entities/instance'
import { faker } from '@/test/lib/faker'

export function makeInstance(
	override: Partial<InstanceProps> = {},
	id?: UniqueEntityID,
) {
	return Instance.create(
		{
			name: faker.company.name(),
			phone: faker.phone.number(),
			...override,
		},
		id,
	)
}
