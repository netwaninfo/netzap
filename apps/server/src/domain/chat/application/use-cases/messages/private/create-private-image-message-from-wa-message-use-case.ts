import { type Either, failure, success } from '@/core/either'
import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media'
import { PrivateImageMessage } from '@/domain/chat/enterprise/entities/private/image-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../../repositories/chats-repository'
import { MessagesRepository } from '../../../repositories/messages-repository'
import { DateService } from '../../../services/date-service'
import { CreateMessageMediaFromWAMessageUseCase } from '../create-message-media-from-wa-message-use-case'

interface CreatePrivateImageMessageFromWAMessageUseCaseRequest {
  waMessage: WAPrivateMessage
}

type CreatePrivateImageMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError,
  {
    message: PrivateImageMessage
  }
>

@Injectable()
export class CreatePrivateImageMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private messagesRepository: MessagesRepository,
    private createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase,
    private dateService: DateService
  ) {}

  async execute(
    request: CreatePrivateImageMessageFromWAMessageUseCaseRequest
  ): Promise<CreatePrivateImageMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    const hasInvalidFormat = waMessage.type !== 'image'
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

    const someMessage =
      await this.messagesRepository.findUniquePrivateMessageByChatIAndWAMessageId(
        {
          chatId: chat.id,
          waMessageId: waMessage.id,
        }
      )

    if (someMessage) {
      return failure(new ResourceAlreadyExistsError({ id: waMessage.ref }))
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

    let media: MessageMedia | null = null
    if (waMessage.hasMedia()) {
      const response = await this.createMessageMediaFromWAMessage.execute({
        waMessage,
      })

      if (response.isFailure()) return failure(response.value)
      media = response.value.media
    }

    const message = PrivateImageMessage.create({
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
