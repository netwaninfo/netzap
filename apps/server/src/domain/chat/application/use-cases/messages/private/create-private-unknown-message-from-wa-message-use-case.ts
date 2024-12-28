import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import { PrivateUnknownMessage } from '@/domain/chat/enterprise/entities/private/unknown-message.js'
import type { WAPrivateMessage } from '@/domain/chat/enterprise/entities/wa/private/message.js'
import type { PrivateMessage } from '@/domain/chat/enterprise/types/message.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { ChatsRepository } from '../../../repositories/chats-repository.js'
import { MessagesRepository } from '../../../repositories/messages-repository.js'
import { DateService } from '../../../services/date-service.js'

interface CreatePrivateUnknownMessageFromWAMessageUseCaseRequest {
  waMessage: WAPrivateMessage
}

type CreatePrivateUnknownMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError,
  {
    message: PrivateUnknownMessage
  }
>

@Injectable()
export class CreatePrivateUnknownMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private messagesRepository: MessagesRepository,
    private dateService: DateService
  ) {}

  async execute(
    request: CreatePrivateUnknownMessageFromWAMessageUseCaseRequest
  ): Promise<CreatePrivateUnknownMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    const hasInvalidFormat = waMessage.type !== 'unknown'
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

    const message = PrivateUnknownMessage.create({
      quoted,
      chatId: chat.id,
      instanceId: chat.instanceId,
      waChatId: chat.waChatId,
      waMessageId: waMessage.id,
      isForwarded: waMessage.isForwarded,
      createdAt: this.dateService.fromUnix(waMessage.timestamp).toDate(),
      isFromMe: waMessage.isFromMe,
      status: waMessage.ack,
      payload: waMessage.raw,
    })

    await this.messagesRepository.create(message)

    return success({ message })
  }
}
