import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupUnknownMessage } from '@/domain/chat/enterprise/entities/group/unknown-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { SetNonNullable } from 'type-fest'
import { PrismaAttendantMapper } from '../prisma-attendant-mapper'
import { PrismaContactInstanceMapper } from '../prisma-contact-instance-mapper'
import { RawGroupMessage } from './message-mapper'
import { PrismaGroupMessageMapper } from './message-mapper'

type Raw = SetNonNullable<RawGroupMessage, 'author'>

export class PrismaGroupUnknownMessageMapper {
	static toDomain(raw: Raw): GroupUnknownMessage {
		return GroupUnknownMessage.create(
			{
				status: raw.status,
				chatId: UniqueEntityID.create(raw.chatId),
				instanceId: UniqueEntityID.create(raw.instanceId),
				waChatId: WAEntityID.createFromString(raw.waChatId),
				waMessageId: WAMessageID.createFromString(raw.waMessageId),
				author: PrismaContactInstanceMapper.toDomain(raw.author),
				isForwarded: raw.isForwarded,
				isFromMe: raw.isFromMe,
				createdAt: raw.createdAt,
				payload: raw.payload,
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
		message: GroupUnknownMessage,
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
			payload: message.payload ?? null,
		}
	}
}