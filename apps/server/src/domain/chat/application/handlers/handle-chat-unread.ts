import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { Chat } from '../../enterprise/types/chat'
import { ChatEmitter } from '../emitters/chat-emitter'
import type { ChatsRepository } from '../repositories/chats-repository'

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
    await this.chatsRepository.save(chat)
    this.chatEmitter.emitChange({ chat })

    return success({ chat })
  }
}
