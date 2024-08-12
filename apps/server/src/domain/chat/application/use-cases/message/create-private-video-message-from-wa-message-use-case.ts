import { Readable } from 'node:stream'
import { type Either, failure, success } from '@/core/either'
import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media'
import { PrivateVideoMessage } from '@/domain/chat/enterprise/entities/private/video-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../repositories/chats-repository'
import type { MessagesRepository } from '../../repositories/messages-repository'
import type { DateService } from '../../services/date-service'
import type { StorageService } from '../../services/storage-service'

interface CreatePrivateVideoMessageFromWAMessageUseCaseRequest {
	waMessage: WAPrivateMessage
}

type CreatePrivateVideoMessageFromWAMessageUseCaseResponse = Either<
	ResourceNotFoundError | InvalidResourceFormatError,
	{
		message: PrivateVideoMessage
	}
>

export class CreatePrivateVideoMessageFromWAMessageUseCase {
	constructor(
		private chatsRepository: ChatsRepository,
		private messagesRepository: MessagesRepository,
		private storageService: StorageService,
		private dateService: DateService,
	) {}

	async execute(
		request: CreatePrivateVideoMessageFromWAMessageUseCaseRequest,
	): Promise<CreatePrivateVideoMessageFromWAMessageUseCaseResponse> {
		const { waMessage } = request

		const hasInvalidFormat = waMessage.type !== 'video' || !waMessage.hasMedia()
		if (hasInvalidFormat) {
			return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
		}

		const chat =
			await this.chatsRepository.findUniquePrivateChatByWAChatIdAndInstanceId({
				instanceId: waMessage.instanceId,
				waChatId: waMessage.waChatId,
			})

		if (!chat) {
			return failure(
				new ResourceNotFoundError({
					id: `${waMessage.instanceId.toString()}/${waMessage.waChatId.toString()}`,
				}),
			)
		}

		let quoted: PrivateMessage | null = null

		if (waMessage.hasQuoted()) {
			quoted =
				await this.messagesRepository.findUniquePrivateMessageByChatIAndWAMessageId(
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

		const message = PrivateVideoMessage.create({
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
