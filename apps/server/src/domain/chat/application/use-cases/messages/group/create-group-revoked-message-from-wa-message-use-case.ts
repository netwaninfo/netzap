import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import { GroupRevokedMessage } from '@/domain/chat/enterprise/entities/group/revoked-message.js'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { ChatsRepository } from '../../../repositories/chats-repository.js'
import { ContactsRepository } from '../../../repositories/contacts-repository.js'
import { MessagesRepository } from '../../../repositories/messages-repository.js'
import { DateService } from '../../../services/date-service.js'

interface CreateGroupRevokedMessageFromWAMessageUseCaseRequest {
  waMessage: WAGroupMessage
}

type CreateGroupRevokedMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError,
  {
    message: GroupRevokedMessage
  }
>

@Injectable()
export class CreateGroupRevokedMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private contactsRepository: ContactsRepository,
    private messagesRepository: MessagesRepository,
    private dateService: DateService
  ) {}

  async execute(
    request: CreateGroupRevokedMessageFromWAMessageUseCaseRequest
  ): Promise<CreateGroupRevokedMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    const hasInvalidFormat = waMessage.type !== 'revoked'
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

    const createdAndRevokedAt = this.dateService
      .fromUnix(waMessage.timestamp)
      .toDate()

    const message = GroupRevokedMessage.create({
      author,
      chatId: chat.id,
      instanceId: chat.instanceId,
      waChatId: chat.waChatId,
      waMessageId: waMessage.id,
      isForwarded: waMessage.isForwarded,
      createdAt: createdAndRevokedAt,
      revokedAt: createdAndRevokedAt,
      isFromMe: waMessage.isFromMe,
      status: waMessage.ack,
    })

    await this.messagesRepository.create(message)

    return success({ message })
  }
}
