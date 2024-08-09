import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	PrivateDocumentMessage,
	type PrivateDocumentMessageProps,
} from '@/domain/chat/enterprise/entities/private/document-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeMessageMedia } from '../make-message-media'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateDocumentMessage(
	override: Partial<PrivateDocumentMessageProps> = {},
	id?: UniqueEntityID,
) {
	return PrivateDocumentMessage.create(
		{
			chatId: makeUniqueEntityID(),
			instanceId: makeUniqueEntityID(),
			waChatId: makeWAEntityID(),
			waMessageId: makeWAMessageID(),
			media: makeMessageMedia(),
			...override,
		},
		id,
	)
}
