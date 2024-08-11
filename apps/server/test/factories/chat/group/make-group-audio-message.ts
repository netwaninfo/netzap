import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
	GroupAudioMessage,
	type GroupAudioMessageProps,
} from '@/domain/chat/enterprise/entities/group/audio-message'
import { makeUniqueEntityID } from '../../make-unique-entity-id'
import { makeContact } from '../make-contact'
import { makeMessageMedia } from '../make-message-media'
import { makeWAEntityID } from '../value-objects/make-wa-entity-id'
import { makeWAMessageID } from '../value-objects/make-wa-message-id'

export function makeGroupAudioMessage(
	override: Partial<GroupAudioMessageProps> = {},
	id?: UniqueEntityID,
) {
	return GroupAudioMessage.create(
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
