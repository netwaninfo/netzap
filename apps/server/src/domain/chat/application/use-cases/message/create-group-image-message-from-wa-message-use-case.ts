import { Readable } from 'node:stream'
import { type Either, failure, success } from '@/core/either'
import { GroupImageMessage } from '@/domain/chat/enterprise/entities/group/image-message'
import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { ContactsRepository } from '../../repositories/contacts-repository'
import type { MessagesRepository } from '../../repositories/messages-repository'
import type { DateService } from '../../services/date-service'
import type { StorageService } from '../../services/storage-service'

interface CreateGroupImageMessageFromWAMessageRequest {
	waMessage: WAGroupMessage
}

type CreateGroupImageMessageFromWAMessageResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		message: GroupImageMessage
	}
>

export class CreateGroupImageMessageFromWAMessage {
	constructor(
		private chatsRepository: ChatsRepository,
		private contactsRepository: ContactsRepository,
		private messagesRepository: MessagesRepository,
		private storageService: StorageService,
		private dateService: DateService,
	) {}

	async execute(
		request: CreateGroupImageMessageFromWAMessageRequest,
	): Promise<CreateGroupImageMessageFromWAMessageResponse> {
		const { waMessage } = request

		const hasInvalidFormat = waMessage.type !== 'image' || !waMessage.hasMedia()
		if (hasInvalidFormat) {
			return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
		}

		const [chat, author] = await Promise.all([
			this.chatsRepository.findUniqueGroupChatByWAChatIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waChatId: waMessage.waChatId,
			}),
			this.contactsRepository.findUniqueByWAContactIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waContactId: waMessage.author.id,
			}),
		])

		if (!chat) {
			return failure(
				new ResourceNotFoundError({
					id: `${waMessage.instanceId.toString()}/${waMessage.waChatId.toString()}`,
				}),
			)
		}

		if (!author) {
			return failure(new ResourceNotFoundError({ id: waMessage.author.ref }))
		}

		let quoted: GroupMessage | null = null

		if (waMessage.hasQuoted()) {
			quoted =
				await this.messagesRepository.findUniqueGroupMessageByChatIAndWAMessageId(
					{
						chatId: chat.id,
						waMessageId: waMessage.quoted.id,
					},
				)
		}

		const waMessageMedia = waMessage.media
		const extension = waMessageMedia.mimeType.extension()

		const storageObject = await this.storageService.put({
			filename: `${waMessage.ref}.${extension}`,
			mimeType: waMessageMedia.mimeType,
			data: Readable.from(Buffer.from(waMessageMedia.data, 'base64')),
		})

		const media = MessageMedia.create({
			key: storageObject.path,
			url: storageObject.url,
			mimeType: storageObject.mimeType,
		})

		const message = GroupImageMessage.create({
			author,
			media,
			quoted,
			chatId: chat.id,
			instanceId: chat.instanceId,
			body: waMessage.body,
			waChatId: chat.waChatId,
			waMessageId: waMessage.id,
			isForwarded: waMessage.isForwarded,
			createdAt: this.dateService.fromUnix(waMessage.timestamp).toDate(),
			isFromMe: waMessage.isFromMe,
			status: waMessage.ack,
		})

		await this.messagesRepository.create(message)

		return success({ message })
	}
}
