import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { Injectable } from '@nestjs/common'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id.js'
import type { Chat } from '../../enterprise/types/chat.js'
import { ChatEmitter } from '../emitters/chat-emitter.js'
import { ChatsRepository } from '../repositories/chats-repository.js'
import { WhatsAppService } from '../services/whats-app-service.js'

interface HandleChatReadRequest {
  instanceId: UniqueEntityID
  waChatId: WAEntityID
}

type HandleChatReadResponse = Either<
  ResourceNotFoundError,
  {
    chat: Chat
  }
>

@Injectable()
export class HandleChatRead {
  constructor(
    private chatsRepository: ChatsRepository,
    private whatsAppService: WhatsAppService,
    private chatEmitter: ChatEmitter
  ) {}

  async execute(
    request: HandleChatReadRequest
  ): Promise<HandleChatReadResponse> {
    const { instanceId, waChatId } = request

    const chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
      instanceId,
      waChatId,
    })

    if (!chat) {
      return failure(
        new ResourceNotFoundError({
          id: `${instanceId.toString()}/${waChatId.toString()}`,
        })
      )
    }

    const response = await this.whatsAppService.sendChatSeen({
      waChatId,
      instanceId,
    })

    if (response.isFailure()) failure(response.value)

    chat.read()
    await this.chatsRepository.setUnreadCount(chat)
    this.chatEmitter.emitChange({ chat })

    return success({ chat })
  }
}
