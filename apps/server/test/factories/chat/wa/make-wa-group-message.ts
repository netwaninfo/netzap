import type { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import {
	WAGroupMessage,
	type WAGroupMessageProps,
} from '@/domain/chat/enterprise/entities/wa/group/message'
import { faker } from '@faker-js/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'
import { makeWAPrivateContact } from './make-wa-private-contact'

export const makeWAGroupMessage = (
	override: Partial<WAGroupMessageProps> = {},
	id: WAMessageID = makeWAMessageID(),
) => {
	return WAGroupMessage.create(
		{
			ack: 'pending',
			body: faker.lorem.paragraph(),
			waChatId: makeWAEntityID(),
			instanceId: makeUniqueEntityID(),
			isForwarded: faker.datatype.boolean(),
			isFromMe: faker.datatype.boolean(),
			timestamp: Date.now(),
			type: 'text',
			author: makeWAPrivateContact(),
			raw: {},
			...override,
		},
		id,
	)
}
