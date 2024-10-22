import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupTextMessage } from '@/domain/chat/enterprise/entities/group/text-message'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../../repositories/chats-repository'
import { ContactsRepository } from '../../../repositories/contacts-repository'
import { MessagesRepository } from '../../../repositories/messages-repository'
import { DateService } from '../../../services/date-service'

interface CreateGroupTextMessageFromWAMessageUseCaseRequest {
  waMessage: WAGroupMessage
  attendantId?: UniqueEntityID
}

type CreateGroupTextMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError,
  {
    message: GroupTextMessage
  }
>

@Injectable()
export class CreateGroupTextMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private contactsRepository: ContactsRepository,
    private messagesRepository: MessagesRepository,
    private dateService: DateService
  ) {}

  async execute(
    request: CreateGroupTextMessageFromWAMessageUseCaseRequest
  ): Promise<CreateGroupTextMessageFromWAMessageUseCaseResponse> {
    const { waMessage, attendantId } = request

    const hasInvalidFormat = waMessage.type !== 'text'
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

    const message = GroupTextMessage.create({
      author,
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
