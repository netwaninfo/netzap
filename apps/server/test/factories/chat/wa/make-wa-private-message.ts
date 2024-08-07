import type { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import {
	WAPrivateMessage,
	type WAPrivateMessageProps,
} from '@/domain/chat/enterprise/entities/wa/private/message'
import { faker } from '@faker-js/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export const makeWAPrivateMessage = (
	override: Partial<WAPrivateMessageProps> = {},
	id: WAMessageID = makeWAMessageID(),
) => {
	return WAPrivateMessage.create(
		{
			ack: 'pending',
			body: faker.lorem.paragraph(),
			chatId: makeWAEntityID(),
			instanceId: makeUniqueEntityID(),
			isForwarded: faker.datatype.boolean(),
			isFromMe: faker.datatype.boolean(),
			timestamp: Date.now(),
			type: 'text',
			...override,
		},
		id,
	)
}
