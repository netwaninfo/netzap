import { type Either, failure, success } from '@/core/either.js'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { Injectable } from '@nestjs/common'
import type { Chat } from '../../enterprise/types/chat.js'
import type { Message } from '../../enterprise/types/message.js'
import type { WAChat } from '../../enterprise/types/wa-chat.js'
import type { WAMessage } from '../../enterprise/types/wa-message.js'
import { ChatEmitter } from '../emitters/chat-emitter.js'
import { MessageEmitter } from '../emitters/message-emitter.js'
import { ChatsRepository } from '../repositories/chats-repository.js'
import { CreateChatFromWAChatUseCase } from '../use-cases/chats/create-chat-from-wa-chat-use-case.js'
import { CreateMessageFromWAMessageUseCase } from '../use-cases/messages/create-message-from-wa-message-use-case.js'

interface HandleReceivedWARequestMessage {
  waMessage: WAMessage
  waChat: WAChat
}

type HandleReceivedWAResponseMessage = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError
  | null,
  {
    message: Message
    chat: Chat
  }
>

@Injectable()
export class HandleReceivedWAMessage {
  constructor(
    private chatsRepository: ChatsRepository,
    private createChatFromWAChat: CreateChatFromWAChatUseCase,
    private createMessageFromWAMessage: CreateMessageFromWAMessageUseCase,
    private messageEmitter: MessageEmitter,
    private chatEmitter: ChatEmitter
  ) {}

  async execute(
    request: HandleReceivedWARequestMessage
  ): Promise<HandleReceivedWAResponseMessage> {
    const { waChat, waMessage } = request

    let chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
      instanceId: waChat.instanceId,
      waChatId: waChat.id,
    })

    const hasPreviousChat = !!chat

    if (!chat) {
      const response = await this.createChatFromWAChat.execute({ waChat })

      if (response.isFailure()) return failure(response.value)
      chat = response.value.chat
    }

    const response = await this.createMessageFromWAMessage.execute({
      waMessage,
    })

    if (response.isFailure()) return failure(response.value)
    const { message } = response.value

    if (!chat) return failure(null)
    chat.interact(message)

    await Promise.all([
      this.chatsRepository.setMessage(chat),
      this.chatsRepository.setUnreadCount(chat),
    ])

    if (!hasPreviousChat) {
      this.chatEmitter.emitCreate({ chat })

      return success({ message, chat })
    }

    this.messageEmitter.emitCreate({ message })
    this.chatEmitter.emitChange({ chat })

    return success({ message, chat })
  }
}
