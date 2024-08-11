import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	PrivateMultiVCardMessage,
	type PrivateMultiVCardMessageProps,
} from '@/domain/chat/enterprise/entities/private/multi-v-card-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateMultiVCardMessage(
	override: Partial<PrivateMultiVCardMessageProps> = {},
	id?: UniqueEntityID,
) {
	return PrivateMultiVCardMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			contacts: [makeContact()],
			...override,
		},
		id,
	)
}
