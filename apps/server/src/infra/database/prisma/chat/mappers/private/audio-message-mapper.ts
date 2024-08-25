import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrivateAudioMessage } from '@/domain/chat/enterprise/entities/private/audio-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { SetNonNullable } from 'type-fest'
import { PrismaAttendantMapper } from '../prisma-attendant-mapper'
import { PrismaMessageMediaMapper } from '../prisma-message-media-mapper'
import { RawPrivateMessage } from './message-mapper'
import { PrismaPrivateMessageMapper } from './message-mapper'

type Raw = SetNonNullable<RawPrivateMessage, 'media'>

export class PrismaPrivateAudioMessageMapper {
	static toDomain(raw: Raw): PrivateAudioMessage {
		return PrivateAudioMessage.create(
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
				...(raw.quoted && {
					quoted: PrismaPrivateMessageMapper.toDomain(raw.quoted),
				}),
				...(raw.sentBy && {
					sentBy: PrismaAttendantMapper.toDomain(raw.sentBy),
				}),
			},
			UniqueEntityID.create(raw.id),
		)
	}

	static toPrisma(
		message: PrivateAudioMessage,
	): Prisma.MessageUncheckedCreateInput {
		return {
			id: message.id.toString(),
			chatType: 'private',
			chatId: message.chatId.toString(),
			waChatId: message.waChatId.toString(),
			waMessageId: message.waChatId.toString(),
			instanceId: message.instanceId.toString(),
			quotedId: message.quoted?.id.toString(),
			senderId: message.sentBy?.id.toString(),
			type: message.type,
			status: message.status,
			isForwarded: message.isForwarded,
			isFromMe: message.isFromMe,
			createdAt: message.createdAt,
			media: PrismaMessageMediaMapper.toPrisma(message.media),
		}
	}
}
