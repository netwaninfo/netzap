import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	PrivateAudioMessage,
	type PrivateAudioMessageProps,
} from '@/domain/chat/enterprise/entities/private/audio-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeMessageMedia } from '../make-message-media'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makePrivateAudioMessage(
	override: Partial<PrivateAudioMessageProps> = {},
	id?: UniqueEntityID,
) {
	return PrivateAudioMessage.create(
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
