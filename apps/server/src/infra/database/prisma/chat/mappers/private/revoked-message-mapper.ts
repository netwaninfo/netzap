import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrivateRevokedMessage } from '@/domain/chat/enterprise/entities/private/revoked-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { PrismaAttendantMapper } from '../prisma-attendant-mapper'
import { RawPrivateMessage } from './message-mapper'
import { PrismaPrivateMessageMapper } from './message-mapper'

type Raw = RawPrivateMessage

export class PrismaPrivateRevokedMessageMapper {
	static toDomain(raw: Raw): PrivateRevokedMessage {
		return PrivateRevokedMessage.create(
			{
				status: raw.status,
				chatId: UniqueEntityID.create(raw.chatId),
				instanceId: UniqueEntityID.create(raw.instanceId),
				waChatId: WAEntityID.createFromString(raw.waChatId),
				waMessageId: WAMessageID.createFromString(raw.waMessageId),
				isForwarded: raw.isForwarded,
				isFromMe: raw.isFromMe,
				createdAt: raw.createdAt,
				revokedAt: raw.revokedAt ?? raw.createdAt,
				...(raw.quoted && {
					quoted: PrismaPrivateMessageMapper.toDomain(raw.quoted),
				}),
				...(raw.sentBy && {
					sentBy: PrismaAttendantMapper.toDomain(raw.sentBy),
				}),
				...(raw.revokedBy && {
					revokedBy: PrismaAttendantMapper.toDomain(raw.revokedBy),
				}),
			},
			UniqueEntityID.create(raw.id),
		)
	}

	static toPrisma(
		message: PrivateRevokedMessage,
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
			revokerId: message.revokedBy?.id.toString(),
			revokedAt: message.revokedAt,
		}
	}
}
