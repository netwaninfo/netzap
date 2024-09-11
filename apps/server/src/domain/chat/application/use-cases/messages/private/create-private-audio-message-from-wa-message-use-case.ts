import { type Either, failure, success } from '@/core/either'
import { PrivateAudioMessage } from '@/domain/chat/enterprise/entities/private/audio-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { ChatsRepository } from '../../../repositories/chats-repository'
import type { MessagesRepository } from '../../../repositories/messages-repository'
import type { DateService } from '../../../services/date-service'
import type { CreateMessageMediaFromWAMessageUseCase } from '../create-message-media-from-wa-message-use-case'

interface CreatePrivateAudioMessageFromWAMessageUseCaseRequest {
  waMessage: WAPrivateMessage
}

type CreatePrivateAudioMessageFromWAMessageUseCaseResponse = Either<
  ResourceNotFoundError | InvalidResourceFormatError,
  {
    message: PrivateAudioMessage
  }
>

export class CreatePrivateAudioMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private messagesRepository: MessagesRepository,
    private createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase,
    private dateService: DateService
  ) {}

  async execute(
    request: CreatePrivateAudioMessageFromWAMessageUseCaseRequest
  ): Promise<CreatePrivateAudioMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    const hasInvalidFormat = waMessage.type !== 'audio' || !waMessage.hasMedia()
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
        })
      )
    }

    let quoted: PrivateMessage | null = null

    if (waMessage.hasQuoted()) {
      quoted =
        await this.messagesRepository.findUniquePrivateMessageByChatIAndWAMessageId(
          {
            chatId: chat.id,
            waMessageId: waMessage.quoted.id,
          }
        )
    }

    const response = await this.createMessageMediaFromWAMessage.execute({
      waMessage,
    })

    if (response.isFailure()) return failure(response.value)
    const { media } = response.value

    const message = PrivateAudioMessage.create({
      media,
      quoted,
      chatId: chat.id,
      instanceId: chat.instanceId,
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
