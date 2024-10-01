import { type Either, failure, success } from '@/core/either'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import type { Chat } from '../../enterprise/types/chat'
import type { Message } from '../../enterprise/types/message'
import type { WAChat } from '../../enterprise/types/wa-chat'
import type { WAMessage } from '../../enterprise/types/wa-message'
import { ChatEmitter } from '../emitters/chat-emitter'
import { MessageEmitter } from '../emitters/message-emitter'
import { ChatsRepository } from '../repositories/chats-repository'
import { CreateChatFromWAChatUseCase } from '../use-cases/chats/create-chat-from-wa-chat-use-case'
import { CreateMessageFromWAMessageUseCase } from '../use-cases/messages/create-message-from-wa-message-use-case'

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
