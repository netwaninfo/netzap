import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	GroupTextMessage,
	type GroupTextMessageProps,
} from '@/domain/chat/enterprise/entities/group/text-message'
import { faker } from '@/test/lib/faker'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makeGroupTextMessage(
	override: Partial<GroupTextMessageProps> = {},
	id?: UniqueEntityID,
) {
	return GroupTextMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			body: faker.lorem.paragraph(),
			author: makeContact(),
			...override,
		},
		id,
	)
}
