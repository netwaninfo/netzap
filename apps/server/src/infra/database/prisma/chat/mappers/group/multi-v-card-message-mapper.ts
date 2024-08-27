import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupMultiVCardMessage } from '@/domain/chat/enterprise/entities/group/multi-v-card-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { Prisma } from '@prisma/client'
import { SetNonNullable } from 'type-fest'
import {
	PrismaContactInstanceMapper,
	Raw as RawContactInstance,
} from '../prisma-contact-instance-mapper'
import { RawGroupMessage } from './message-mapper'
import { PrismaGroupMessageMapper } from './message-mapper'

type Raw = SetNonNullable<RawGroupMessage, 'author'> & {
	contacts: RawContactInstance[]
}

export class PrismaGroupMultiVCardMessageMapper {
	static toDomain(raw: Raw): GroupMultiVCardMessage {
		return GroupMultiVCardMessage.create(
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
				contacts: raw.contacts.map(PrismaContactInstanceMapper.toDomain),
				...(raw.senderId && { sentBy: UniqueEntityID.create(raw.senderId) }),
				...(raw.quoted && {
					quoted: PrismaGroupMessageMapper.toDomain(raw.quoted),
				}),
			},
			UniqueEntityID.create(raw.id),
		)
	}

	static toPrisma(
		message: GroupMultiVCardMessage,
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
			senderId: message.sentBy?.toString(),
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
