import { type Either, failure, success } from '@/core/either'
import { GroupAudioMessage } from '@/domain/chat/enterprise/entities/group/audio-message'
import type { WAGroupMessage } from '@/domain/chat/enterprise/entities/wa/group/message'
import type { GroupMessage } from '@/domain/chat/enterprise/types/message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../../repositories/chats-repository'
import { ContactsRepository } from '../../../repositories/contacts-repository'
import { MessagesRepository } from '../../../repositories/messages-repository'
import { DateService } from '../../../services/date-service'
import { CreateMessageMediaFromWAMessageUseCase } from '../create-message-media-from-wa-message-use-case'

interface CreateGroupAudioMessageFromWAMessageUseCaseRequest {
  waMessage: WAGroupMessage
}

type CreateGroupAudioMessageFromWAMessageUseCaseResponse = Either<
  ResourceNotFoundError | InvalidResourceFormatError,
  {
    message: GroupAudioMessage
  }
>

@Injectable()
export class CreateGroupAudioMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private contactsRepository: ContactsRepository,
    private messagesRepository: MessagesRepository,
    private createMessageMediaFromWAMessage: CreateMessageMediaFromWAMessageUseCase,
    private dateService: DateService
  ) {}

  async execute(
    request: CreateGroupAudioMessageFromWAMessageUseCaseRequest
  ): Promise<CreateGroupAudioMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    const hasInvalidFormat = waMessage.type !== 'audio' || !waMessage.hasMedia()
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

    const response = await this.createMessageMediaFromWAMessage.execute({
      waMessage,
    })

    if (response.isFailure()) return failure(response.value)
    const { media } = response.value

    const message = GroupAudioMessage.create({
      author,
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
