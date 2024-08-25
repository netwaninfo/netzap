import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrivateMultiVCardMessage } from '@/domain/chat/enterprise/entities/private/multi-v-card-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { PrismaAttendantMapper } from '../prisma-attendant-mapper'
import {
	PrismaContactInstanceMapper,
	Raw as RawContactInstance,
} from '../prisma-contact-instance-mapper'
import { RawPrivateMessage } from './message-mapper'
import { PrismaPrivateMessageMapper } from './message-mapper'

type Raw = RawPrivateMessage & {
	contacts: RawContactInstance[]
}

export class PrismaPrivateMultiVCardMessageMapper {
	static toDomain(raw: Raw): PrivateMultiVCardMessage {
		return PrivateMultiVCardMessage.create(
			{
				status: raw.status,
				chatId: UniqueEntityID.create(raw.chatId),
				instanceId: UniqueEntityID.create(raw.instanceId),
				waChatId: WAEntityID.createFromString(raw.waChatId),
				waMessageId: WAMessageID.createFromString(raw.waMessageId),
				isForwarded: raw.isForwarded,
				isFromMe: raw.isFromMe,
				createdAt: raw.createdAt,
				contacts: raw.contacts.map(PrismaContactInstanceMapper.toDomain),
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
		message: PrivateMultiVCardMessage,
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
			contacts: {
				connect: message.contacts.map((contact) => ({
					contactId_instanceId: {
						contactId: contact.id.toString(),
						instanceId: message.instanceId.toString(),
					},
				})),
			},
		}
	}
}
