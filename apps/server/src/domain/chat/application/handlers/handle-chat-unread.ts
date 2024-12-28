import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id.js'
import type { Chat } from '../../enterprise/types/chat.js'
import { ChatEmitter } from '../emitters/chat-emitter.js'
import type { ChatsRepository } from '../repositories/chats-repository.js'

interface HandleChatUnreadRequest {
  instanceId: UniqueEntityID
  waChatId: WAEntityID
}

type HandleChatUnreadResponse = Either<
  ResourceNotFoundError,
  {
    chat: Chat
  }
>

export class HandleChatUnread {
  constructor(
    private chatsRepository: ChatsRepository,
    private chatEmitter: ChatEmitter
  ) {}

  async execute(
    request: HandleChatUnreadRequest
  ): Promise<HandleChatUnreadResponse> {
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

    chat.unread()
    await this.chatsRepository.setUnreadCount(chat)
    this.chatEmitter.emitChange({ chat })

    return success({ chat })
  }
}
