import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupDocumentMessage } from '@/domain/chat/enterprise/entities/group/document-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { SetNonNullable } from 'type-fest'
import { PrismaAttendantMapper } from '../prisma-attendant-mapper'
import { PrismaContactInstanceMapper } from '../prisma-contact-instance-mapper'
import { PrismaMessageMediaMapper } from '../prisma-message-media-mapper'
import { RawGroupMessage } from './message-mapper'
import { PrismaGroupMessageMapper } from './message-mapper'

type Raw = SetNonNullable<RawGroupMessage, 'media' | 'author'>

export class PrismaGroupDocumentMessageMapper {
	static toDomain(raw: Raw): GroupDocumentMessage {
		return GroupDocumentMessage.create(
			{
				status: raw.status,
				chatId: UniqueEntityID.create(raw.chatId),
				instanceId: UniqueEntityID.create(raw.instanceId),
				waChatId: WAEntityID.createFromString(raw.waChatId),
				waMessageId: WAMessageID.createFromString(raw.waMessageId),
				author: PrismaContactInstanceMapper.toDomain(raw.author),
				body: raw.body,
				isForwarded: raw.isForwarded,
				isFromMe: raw.isFromMe,
				createdAt: raw.createdAt,
				media: PrismaMessageMediaMapper.toDomain(raw.media),
				...(raw.quoted && {
					quoted: PrismaGroupMessageMapper.toDomain(raw.quoted),
				}),
				...(raw.sentBy && {
					sentBy: PrismaAttendantMapper.toDomain(raw.sentBy),
				}),
			},
			UniqueEntityID.create(raw.id),
		)
	}

	static toPrisma(
		message: GroupDocumentMessage,
	): Prisma.MessageUncheckedCreateInput {
		return {
			id: message.id.toString(),
			chatType: 'group',
			authorId: message.author.id.toString(),
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
			body: message.body,
		}
	}
}
