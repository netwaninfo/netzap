import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either'
import { Chat } from '@/domain/chat/enterprise/types/chat'
import { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { ChatsRepository } from '../../repositories/chats-repository'
import { CreateMessageFromWAMessageUseCase } from '../messages/create-message-from-wa-message-use-case'

interface LinkChatLastMessageFromWAMessageUseCaseRequest {
  chat: Chat
  waMessage: WAMessage
}

type LinkChatLastMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError
  | null,
  {
    chat: Chat
  }
>

@Injectable()
export class LinkChatLastMessageFromWAMessageUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private createMessageFromWAChat: CreateMessageFromWAMessageUseCase
  ) {}

  async execute(
    request: LinkChatLastMessageFromWAMessageUseCaseRequest
  ): Promise<LinkChatLastMessageFromWAMessageUseCaseResponse> {
    const { chat, waMessage } = request

    if (waMessage.hasQuoted()) {
      const response = await this.execute({ chat, waMessage: waMessage.quoted })
      if (response.isFailure()) return failure(response.value)
    }

    const createMessageResponse = await this.createMessageFromWAChat.execute({
      waMessage,
    })

    if (createMessageResponse.isFailure()) {
      return failure(createMessageResponse.value)
    }

    const { message } = createMessageResponse.value
    chat.interact(message)

    await this.chatsRepository.setMessage(chat)

    return success({ chat })
  }
}
