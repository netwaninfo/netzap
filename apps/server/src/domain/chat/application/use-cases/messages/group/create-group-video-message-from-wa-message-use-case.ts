import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import { GroupVideoMessage } from '@/domain/chat/enterprise/entities/group/video-message.js'
import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media.js'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message.js'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { ChatsRepository } from '../../../repositories/chats-repository.js'
import { ContactsRepository } from '../../../repositories/contacts-repository.js'
import { MessagesRepository } from '../../../repositories/messages-repository.js'
import { DateService } from '../../../services/date-service.js'
import { CreateMessageMediaFromWAMessageUseCase } from '../create-message-media-from-wa-message-use-case.js'

interface CreateGroupVideoMessageFromWAMessageUseCaseRequest {
  waMessage: WAGroupMessage
}

type CreateGroupVideoMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError,
  {
    message: GroupVideoMessage
  }
>

@Injectable()
export class CreateGroupVideoMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private contactsRepository: ContactsRepository,
    private messagesRepository: MessagesRepository,
    private createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase,
    private dateService: DateService
  ) {}

  async execute(
    request: CreateGroupVideoMessageFromWAMessageUseCaseRequest
  ): Promise<CreateGroupVideoMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    const hasInvalidFormat = waMessage.type !== 'video'
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

    let media: MessageMedia | null = null
    if (waMessage.hasMedia()) {
      const response = await this.createMessageMediaFromWAMessage.execute({
        waMessage,
      })

      if (response.isFailure()) return failure(response.value)
      media = response.value.media
    }

    const message = GroupVideoMessage.create({
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
