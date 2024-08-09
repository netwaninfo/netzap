import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	PrivateVCardMessage,
	type PrivateVCardMessageProps,
} from '@/domain/chat/enterprise/entities/private/v-card-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateVCardMessage(
	override: Partial<PrivateVCardMessageProps> = {},
	id?: UniqueEntityID,
) {
	return PrivateVCardMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			contact: makeContact(),
			...override,
		},
		id,
	)
}
