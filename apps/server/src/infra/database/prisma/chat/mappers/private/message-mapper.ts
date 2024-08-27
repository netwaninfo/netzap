import {
	isPrivateMessageWithContacts,
	isPrivateMessageWithMedia,
} from '@/domain/chat/enterprise/type-guards/message'
import { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { Prisma, Message as PrismaMessage } from '@prisma/client'
import { Except, SetNonNullable, SetRequired } from 'type-fest'
import { Raw as RawContactInstance } from '../prisma-contact-instance-mapper'
import { PrismaPrivateAudioMessageMapper } from './audio-message-mapper'
import { PrismaPrivateDocumentMessageMapper } from './document-message-mapper'
import { PrismaPrivateImageMessageMapper } from './image-message-mapper'
import { PrismaPrivateMultiVCardMessageMapper } from './multi-v-card-message-mapper'
import { PrismaPrivateRevokedMessageMapper } from './revoked-message-mapper'
import { PrismaPrivateTextMessageMapper } from './text-message-mapper'
import { PrismaPrivateUnknownMessageMapper } from './unknown-message-mapper'
import { PrismaPrivateVCardMessageMapper } from './v-card-message-mapper'
import { PrismaPrivateVideoMessageMapper } from './video-message-mapper'
import { PrismaPrivateVoiceMessageMapper } from './voice-message-mapper'

export type RawPrivateMessage = PrismaMessage & {
	quoted?: Except<RawPrivateMessage, 'quoted'> | null
	contacts: RawContactInstance[]
}

export class PrismaPrivateMessageMapper {
	static toDomain(raw: RawPrivateMessage): PrivateMessage {
		if (PrismaPrivateMessageMapper.isRawMessageWithMedia(raw)) {
			switch (raw.type) {
				case 'audio':
					return PrismaPrivateAudioMessageMapper.toDomain(raw)

				case 'document':
					return PrismaPrivateDocumentMessageMapper.toDomain(raw)

				case 'image':
					return PrismaPrivateImageMessageMapper.toDomain(raw)

				case 'video':
					return PrismaPrivateVideoMessageMapper.toDomain(raw)

				case 'voice':
					return PrismaPrivateVoiceMessageMapper.toDomain(raw)
			}
		}

		if (PrismaPrivateMessageMapper.isRawMessageWithContacts(raw)) {
			switch (raw.type) {
				case 'vcard':
					return PrismaPrivateVCardMessageMapper.toDomain(raw)

				case 'multi_vcard':
					return PrismaPrivateMultiVCardMessageMapper.toDomain(raw)
			}
		}

		switch (raw.type) {
			case 'revoked':
				return PrismaPrivateRevokedMessageMapper.toDomain(raw)

			case 'text':
				return PrismaPrivateTextMessageMapper.toDomain(raw)
		}

		return PrismaPrivateUnknownMessageMapper.toDomain(raw)
	}

	static toPrisma(message: PrivateMessage): Prisma.MessageUncheckedCreateInput {
		if (isPrivateMessageWithMedia(message)) {
			switch (message.type) {
				case 'audio':
					return PrismaPrivateAudioMessageMapper.toPrisma(message)

				case 'document':
					return PrismaPrivateDocumentMessageMapper.toPrisma(message)

				case 'image':
					return PrismaPrivateImageMessageMapper.toPrisma(message)

				case 'video':
					return PrismaPrivateVideoMessageMapper.toPrisma(message)

				case 'voice':
					return PrismaPrivateVoiceMessageMapper.toPrisma(message)
			}
		}

		if (isPrivateMessageWithContacts(message)) {
			switch (message.type) {
				case 'vcard':
					return PrismaPrivateVCardMessageMapper.toPrisma(message)

				case 'multi_vcard':
					return PrismaPrivateMultiVCardMessageMapper.toPrisma(message)
			}
		}

		switch (message.type) {
			case 'revoked':
				return PrismaPrivateRevokedMessageMapper.toPrisma(message)

			case 'text':
				return PrismaPrivateTextMessageMapper.toPrisma(message)
		}

		return PrismaPrivateUnknownMessageMapper.toPrisma(message)
	}

	// Type Guards/Asserts
	private static isRawMessageWithMedia(
		raw: RawPrivateMessage,
	): raw is SetNonNullable<RawPrivateMessage, 'media'> {
		return !!raw.media
	}

	private static isRawMessageWithContacts(
		raw: RawPrivateMessage,
	): raw is SetRequired<RawPrivateMessage, 'contacts'> {
		return (
			(raw.type === 'multi_vcard' || raw.type === 'vcard') &&
			!!raw.contacts.length
		)
	}
}
