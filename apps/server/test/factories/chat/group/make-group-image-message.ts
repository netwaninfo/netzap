import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	GroupImageMessage,
	type GroupImageMessageProps,
} from '@/domain/chat/enterprise/entities/group/image-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeMessageMedia } from '../make-message-media'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makeGroupImageMessage(
	override: Partial<GroupImageMessageProps> = {},
	id?: UniqueEntityID,
) {
	return GroupImageMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			media: makeMessageMedia(),
			author: makeContact(),
			...override,
		},
		id,
	)
}
