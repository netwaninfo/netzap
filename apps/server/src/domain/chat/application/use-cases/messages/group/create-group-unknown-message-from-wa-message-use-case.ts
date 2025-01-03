import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import { GroupUnknownMessage } from '@/domain/chat/enterprise/entities/group/unknown-message.js'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message.js'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { ChatsRepository } from '../../../repositories/chats-repository.js'
import { ContactsRepository } from '../../../repositories/contacts-repository.js'
import { MessagesRepository } from '../../../repositories/messages-repository.js'
import { DateService } from '../../../services/date-service.js'

interface CreateGroupUnknownMessageFromWAMessageUseCaseRequest {
  waMessage: WAGroupMessage
}

type CreateGroupUnknownMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError,
  {
    message: GroupUnknownMessage
  }
>

@Injectable()
export class CreateGroupUnknownMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private contactsRepository: ContactsRepository,
    private messagesRepository: MessagesRepository,
    private dateService: DateService
  ) {}

  async execute(
    request: CreateGroupUnknownMessageFromWAMessageUseCaseRequest
  ): Promise<CreateGroupUnknownMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    const hasInvalidFormat = waMessage.type !== 'unknown'
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
        })
      )
    }

    if (!author) {
      return failure(new ResourceNotFoundError({ id: waMessage.author.ref }))
    }

    const someMessage =
      await this.messagesRepository.findUniqueGroupMessageByChatIAndWAMessageId(
        {
          chatId: chat.id,
          waMessageId: waMessage.id,
        }
      )

    if (someMessage) {
      return failure(new ResourceAlreadyExistsError({ id: waMessage.ref }))
    }

    let quoted: GroupMessage | null = null
    if (waMessage.hasQuoted()) {
      quoted =
        await this.messagesRepository.findUniqueGroupMessageByChatIAndWAMessageId(
          {
            chatId: chat.id,
            waMessageId: waMessage.quoted.id,
          }
        )
    }

    const message = GroupUnknownMessage.create({
      author,
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
