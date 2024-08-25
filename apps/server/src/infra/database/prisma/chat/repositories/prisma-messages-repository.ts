import {
	MessagesRepository,
	MessagesRepositoryCountByInstanceIdAndWAChatIdParams,
	MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatIdParams,
	MessagesRepositoryFindUniqueByCreatedAtAndInstanceIdAndWAChatIdParams,
	MessagesRepositoryFindUniqueByWAMessageIdAndInstanceIdParams,
	MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams,
	MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams,
} from '@/domain/chat/application/repositories/messages-repository'
import {
	GroupMessage,
	Message,
	PrivateMessage,
} from '@/domain/chat/enterprise/types/message'
import { Pagination } from '@/domain/shared/entities/pagination'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../../prisma.service'
import { PrismaGroupMessageMapper } from '../mappers/group/message-mapper'
import { PrismaMessageMapper } from '../mappers/prisma-message-mapper'
import { PrismaPrivateMessageMapper } from '../mappers/private/message-mapper'
import { PrismaChatMessageService } from '../prisma-chat-message.service'

const ATTENDANT_SELECT = {
	id: true,
	displayName: true,
	ssoId: true,
} satisfies Prisma.AttendantSelect

const QUOTED_MESSAGE_INCLUDES = {
	sentBy: {
		select: ATTENDANT_SELECT,
	},
	revokedBy: {
		select: ATTENDANT_SELECT,
	},
	contacts: {
		include: {
			contact: true,
		},
	},
	author: {
		include: {
			contact: true,
		},
	},
} satisfies Prisma.MessageInclude

const MESSAGE_INCLUDES = {
	sentBy: {
		select: ATTENDANT_SELECT,
	},
	revokedBy: {
		select: ATTENDANT_SELECT,
	},
	contacts: {
		include: {
			contact: true,
		},
	},
	quoted: {
		include: QUOTED_MESSAGE_INCLUDES,
	},
	author: {
		include: {
			contact: true,
		},
	},
} satisfies Prisma.MessageInclude

@Injectable()
export class PrismaMessagesRepository implements MessagesRepository {
	constructor(
		private prisma: PrismaService,
		private messageService: PrismaChatMessageService,
	) {}

	async findUniquePrivateMessageByChatIAndWAMessageId({
		chatId,
		waMessageId,
	}: MessagesRepositoryFindUniquePrivateMessageByChatIAndWAMessageIdParams): Promise<PrivateMessage | null> {
		const prismaMessage = await this.prisma.message.findUnique({
			where: {
				chatType: 'private',
				chatId_waMessageId: {
					chatId: chatId.toString(),
					waMessageId: waMessageId.toString(),
				},
			},
			include: MESSAGE_INCLUDES,
		})

		if (!prismaMessage) return null

		return PrismaPrivateMessageMapper.toDomain(
			await this.messageService.getRawPrivateMessage(prismaMessage),
		)
	}

	async findUniqueGroupMessageByChatIAndWAMessageId({
		chatId,
		waMessageId,
	}: MessagesRepositoryFindUniqueGroupMessageByChatIAndWAMessageIdParams): Promise<GroupMessage | null> {
		const prismaMessage = await this.prisma.message.findUnique({
			where: {
				chatType: 'group',
				chatId_waMessageId: {
					chatId: chatId.toString(),
					waMessageId: waMessageId.toString(),
				},
			},
			include: MESSAGE_INCLUDES,
		})

		if (!prismaMessage) return null

		return PrismaGroupMessageMapper.toDomain(
			await this.messageService.getRawGroupMessage(prismaMessage),
		)
	}

	async findUniqueByWAMessageIdAndInstanceId({
		instanceId,
		waMessageId,
	}: MessagesRepositoryFindUniqueByWAMessageIdAndInstanceIdParams): Promise<Message | null> {
		const prismaMessage = await this.prisma.message.findUnique({
			where: {
				instanceId_waMessageId: {
					instanceId: instanceId.toString(),
					waMessageId: waMessageId.toString(),
				},
			},
			include: MESSAGE_INCLUDES,
		})

		if (!prismaMessage) return null

		return PrismaMessageMapper.toDomain(
			await this.messageService.getRawMessage(prismaMessage),
		)
	}

	async findUniqueByCreatedAtAndInstanceIdAndWAChatId({
		createdAt,
		instanceId,
		waChatId,
	}: MessagesRepositoryFindUniqueByCreatedAtAndInstanceIdAndWAChatIdParams): Promise<Message | null> {
		const prismaMessage = await this.prisma.message.findFirst({
			where: {
				waChatId: waChatId.toString(),
				createdAt: createdAt.toISOString(),
				instanceId: instanceId.toString(),
			},
			include: MESSAGE_INCLUDES,
		})

		if (!prismaMessage) return null

		return PrismaMessageMapper.toDomain(
			await this.messageService.getRawMessage(prismaMessage),
		)
	}

	async findManyPaginatedByInstanceIdAndWAChatId({
		instanceId,
		page,
		take,
		waChatId,
	}: MessagesRepositoryFindManyPaginatedByInstanceIdAndWAChatIdParams): Promise<
		Message[]
	> {
		const prismaMessages = await this.prisma.message.findMany({
			where: {
				waChatId: waChatId.toString(),
				instanceId: instanceId.toString(),
			},
			take,
			skip: Pagination.skip({ limit: take, page }),
			include: MESSAGE_INCLUDES,
		})

		const raw = await this.messageService.getRawMessages(prismaMessages)

		return raw.map(PrismaMessageMapper.toDomain)
	}

	async countByInstanceIdAndWAChatId({
		instanceId,
		waChatId,
	}: MessagesRepositoryCountByInstanceIdAndWAChatIdParams): Promise<number> {
		const rows = await this.prisma.message.count({
			where: {
				waChatId: waChatId.toString(),
				instanceId: instanceId.toString(),
			},
		})

		return rows
	}

	async create(message: Message): Promise<void> {
		await this.prisma.$transaction([
			this.prisma.message.create({
				data: PrismaMessageMapper.toPrisma(message),
			}),
		])
	}

	async save(message: Message): Promise<void> {
		await this.prisma.$transaction([
			this.prisma.message.update({
				data: PrismaMessageMapper.toPrisma(message),
				where: {
					id: message.id.toString(),
				},
			}),
		])
	}
}
