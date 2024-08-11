import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	GroupUnknownMessage,
	type GroupUnknownMessageProps,
} from '@/domain/chat/enterprise/entities/group/unknown-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makeGroupUnknownMessage(
	override: Partial<GroupUnknownMessageProps> = {},
	id?: UniqueEntityID,
) {
	return GroupUnknownMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			author: makeContact(),
			payload: {},
			...override,
		},
		id,
	)
}
