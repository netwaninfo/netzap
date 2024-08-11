import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	GroupMultiVCardMessage,
	type GroupMultiVCardMessageProps,
} from '@/domain/chat/enterprise/entities/group/multi-v-card-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makeGroupMultiVCardMessage(
	override: Partial<GroupMultiVCardMessageProps> = {},
	id?: UniqueEntityID,
) {
	return GroupMultiVCardMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			contacts: [makeContact()],
			author: makeContact(),
			...override,
		},
		id,
	)
}
