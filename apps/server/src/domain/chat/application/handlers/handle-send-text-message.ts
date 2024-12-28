import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { Injectable } from '@nestjs/common'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id.js'
import type { WAMessageID } from '../../enterprise/entities/value-objects/wa-message-id.js'
import type { Chat } from '../../enterprise/types/chat.js'
import type { Message } from '../../enterprise/types/message.js'
import { ChatEmitter } from '../emitters/chat-emitter.js'
import { MessageEmitter } from '../emitters/message-emitter.js'
import { AttendantsRepository } from '../repositories/attendants-repository.js'
import { ChatsRepository } from '../repositories/chats-repository.js'
import { WhatsAppService } from '../services/whats-app-service.js'
import { CreateChatFromWAChatUseCase } from '../use-cases/chats/create-chat-from-wa-chat-use-case.js'
import { CreateTextMessageFromWAMessageUseCase } from '../use-cases/messages/create-text-message-from-wa-message-use-case.js'

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

@Injectable()
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

      const createChatResponse = await this.createChatFromWAChat.execute({
        waChat,
      })

      if (createChatResponse.isFailure()) {
        return failure(createChatResponse.value)
      }

      chat = createChatResponse.value.chat
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

    const createTextResponse =
      await this.createTextMessageFromWAMessage.execute({
        waMessage,
        attendantId,
      })

    if (createTextResponse.isFailure()) return failure(createTextResponse.value)
    const { message } = createTextResponse.value

    if (!chat) return failure(null)

    chat.interact(message)
    await this.chatsRepository.setMessage(chat)

    if (!hasPreviousChat) {
      this.chatEmitter.emitCreate({ chat })

      return success({ message, chat })
    }

    this.messageEmitter.emitCreate({ message })
    this.chatEmitter.emitChange({ chat })

    return success({ message, chat })
  }
}
