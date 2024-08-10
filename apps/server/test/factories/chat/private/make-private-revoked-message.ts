import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	PrivateRevokedMessage,
	type PrivateRevokedMessageProps,
} from '@/domain/chat/enterprise/entities/private/revoked-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateRevokedMessage(
	override: Partial<PrivateRevokedMessageProps> = {},
	id?: UniqueEntityID,
) {
	return PrivateRevokedMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			...override,
		},
		id,
	)
}
