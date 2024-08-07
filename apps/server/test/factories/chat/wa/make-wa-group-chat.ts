import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import {
	WAGroupChat,
	type WAGroupChatProps,
} from '@/domain/chat/enterprise/entities/wa/group/chat'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAGroupContact } from './make-wa-group-contact'

export const makeWAGroupChat = (
	override: Partial<WAGroupChatProps> = {},
	id: WAEntityID = makeWAEntityID(),
) => {
	const instanceId = makeUniqueEntityID()

	return WAGroupChat.create(
		{
			instanceId,
			name: faker.person.firstName(),
			timestamp: Date.now(),
			unreadCount: faker.number.int({ max: 99 }),
			imageUrl: faker.internet.url(),
			contact: makeWAGroupContact({ instanceId }, id),
			...override,
		},
		id,
	)
}
