import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { PrivateTextMessage } from '@/domain/chat/enterprise/entities/private/text-message'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../../repositories/chats-repository'
import { MessagesRepository } from '../../../repositories/messages-repository'
import { DateService } from '../../../services/date-service'

interface CreatePrivateTextMessageFromWAMessageUseCaseRequest {
  waMessage: WAPrivateMessage
  attendantId?: UniqueEntityID
}

type CreatePrivateTextMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError,
  {
    message: PrivateTextMessage
  }
>

@Injectable()
export class CreatePrivateTextMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private messagesRepository: MessagesRepository,
    private dateService: DateService
  ) {}

  async execute(
    request: CreatePrivateTextMessageFromWAMessageUseCaseRequest
  ): Promise<CreatePrivateTextMessageFromWAMessageUseCaseResponse> {
    const { waMessage, attendantId } = request

    const hasInvalidFormat = waMessage.type !== 'text'
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

    const message = PrivateTextMessage.create({
      quoted,
      body: waMessage.body,
      chatId: chat.id,
      instanceId: chat.instanceId,
      waChatId: chat.waChatId,
      waMessageId: waMessage.id,
      isForwarded: waMessage.isForwarded,
      createdAt: this.dateService.fromUnix(waMessage.timestamp).toDate(),
      isFromMe: waMessage.isFromMe,
      status: waMessage.ack,
      sentBy: attendantId,
    })

    await this.messagesRepository.create(message)

    return success({ message })
  }
}
