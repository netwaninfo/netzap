import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	PrivateUnknownMessage,
	type PrivateUnknownMessageProps,
} from '@/domain/chat/enterprise/entities/private/unknown-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateUnknownMessage(
	override: Partial<PrivateUnknownMessageProps> = {},
	id?: UniqueEntityID,
) {
	return PrivateUnknownMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			payload: {},
			...override,
		},
		id,
	)
}
