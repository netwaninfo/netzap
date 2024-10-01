import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id'
import type { Chat } from '../../enterprise/types/chat'
import type { Message } from '../../enterprise/types/message'
import { ChatEmitter } from '../emitters/chat-emitter'
import { MessageEmitter } from '../emitters/message-emitter'
import { AttendantsRepository } from '../repositories/attendants-repository'
import type { ChatsRepository } from '../repositories/chats-repository'
import type { WhatsAppService } from '../services/whats-app-service'
import { CreateChatFromWAChatUseCase } from '../use-cases/chats/create-chat-from-wa-chat-use-case'
import type { CreateTextMessageFromWAMessageUseCase } from '../use-cases/messages/create-text-message-from-wa-message-use-case'

interface HandleSendTextMessageRequest {
  instanceId: UniqueEntityID
  waChatId: WAEntityID
  body: string
  quotedId?: WAMessageID
  attendantId: UniqueEntityID
}

type HandleSendTextMessageResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError
  | UnhandledError
  | ServiceUnavailableError
  | null,
  {
    message: Message
    chat: Chat
  }
>

export class HandleSendTextMessage {
  constructor(
    private chatsRepository: ChatsRepository,
    private attendantsRepository: AttendantsRepository,
    private createChatFromWAChat: CreateChatFromWAChatUseCase,
    private createTextMessageFromWAMessage: CreateTextMessageFromWAMessageUseCase,
    private whatsAppService: WhatsAppService,
    private messageEmitter: MessageEmitter,
    private chatEmitter: ChatEmitter
  ) {}

  async execute(
    request: HandleSendTextMessageRequest
  ): Promise<HandleSendTextMessageResponse> {
    const { attendantId, body, instanceId, waChatId, quotedId } = request

    const attendant =
      await this.attendantsRepository.findUniqueByAttendantIdAndInstanceId({
        attendantId,
        instanceId,
      })

    if (!attendant) {
      return failure(new ResourceNotFoundError({ id: attendantId.toString() }))
    }

    let chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
      instanceId,
      waChatId,
    })

    const hasPreviousChat = !!chat

    if (!chat) {
      const response = await this.whatsAppService.getChatByWAChatId({
        instanceId,
        waChatId,
      })

      if (response.isFailure()) return failure(response.value)
      const { value: waChat } = response

      if (!waChat) {
        return failure(
          new ResourceNotFoundError({
            id: `${instanceId.toString()}/${waChatId.toString()}`,
          })
        )
      }

      const result = await this.createChatFromWAChat.execute({ waChat })
      if (result.isFailure()) return failure(result.value)

      chat = result.value.chat
    }

    // this.chatEmitter.emitCreate({ chat })
    const content = attendant.displayName.concat('\n', body)
    const response = await this.whatsAppService.sendTextMessage({
      body: content,
      instanceId,
      waChatId,
      quotedId,
    })

    if (response.isFailure()) return failure(response.value)
    const { value: waMessage } = response

    const result = await this.createTextMessageFromWAMessage.execute({
      waMessage,
      attendantId,
    })

    if (result.isFailure()) return failure(result.value)
    const { message } = result.value

    chat.interact(message)
    await this.chatsRepository.save(chat)

    if (!hasPreviousChat) {
      this.chatEmitter.emitCreate({ chat })
    } else {
      this.messageEmitter.emitCreate({ message })
      this.chatEmitter.emitChange({ chat })
    }

    return success({ message, chat })
  }
}
