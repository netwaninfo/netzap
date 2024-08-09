import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	PrivateTextMessage,
	type PrivateTextMessageProps,
} from '@/domain/chat/enterprise/entities/private/text-message'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateTextMessage(
	override: Partial<PrivateTextMessageProps> = {},
	id?: UniqueEntityID,
) {
	return PrivateTextMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			body: faker.lorem.paragraph(),
			...override,
		},
		id,
	)
}
