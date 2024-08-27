import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrivateVoiceMessage } from '@/domain/chat/enterprise/entities/private/voice-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { SetNonNullable } from 'type-fest'
import { PrismaMessageMediaMapper } from '../prisma-message-media-mapper'
import { RawPrivateMessage } from './message-mapper'
import { PrismaPrivateMessageMapper } from './message-mapper'

type Raw = SetNonNullable<RawPrivateMessage, 'media'>

export class PrismaPrivateVoiceMessageMapper {
	static toDomain(raw: Raw): PrivateVoiceMessage {
		return PrivateVoiceMessage.create(
			{
				status: raw.status,
				chatId: UniqueEntityID.create(raw.chatId),
				instanceId: UniqueEntityID.create(raw.instanceId),
				waChatId: WAEntityID.createFromString(raw.waChatId),
				waMessageId: WAMessageID.createFromString(raw.waMessageId),
				isForwarded: raw.isForwarded,
				isFromMe: raw.isFromMe,
				createdAt: raw.createdAt,
				media: PrismaMessageMediaMapper.toDomain(raw.media),
				...(raw.senderId && { sentBy: UniqueEntityID.create(raw.senderId) }),
				...(raw.quoted && {
					quoted: PrismaPrivateMessageMapper.toDomain(raw.quoted),
				}),
			},
			UniqueEntityID.create(raw.id),
		)
	}

	static toPrisma(
		message: PrivateVoiceMessage,
	): Prisma.MessageUncheckedCreateInput {
		return {
			id: message.id.toString(),
			chatType: 'private',
			chatId: message.chatId.toString(),
			waChatId: message.waChatId.toString(),
			waMessageId: message.waChatId.toString(),
			instanceId: message.instanceId.toString(),
			quotedId: message.quoted?.id.toString(),
			senderId: message.sentBy?.toString(),
			type: message.type,
			status: message.status,
			isForwarded: message.isForwarded,
			isFromMe: message.isFromMe,
			createdAt: message.createdAt,
			media: PrismaMessageMediaMapper.toPrisma(message.media),
		}
	}
}
