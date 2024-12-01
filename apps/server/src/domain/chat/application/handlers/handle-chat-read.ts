import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { WAEntityID } from '../../enterprise/entities/value-objects/wa-entity-id'
import type { Chat } from '../../enterprise/types/chat'
import { ChatEmitter } from '../emitters/chat-emitter'
import type { ChatsRepository } from '../repositories/chats-repository'

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

export class HandleChatRead {
  constructor(
    private chatsRepository: ChatsRepository,
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

    chat.read()
    await this.chatsRepository.setUnreadCount(chat)
    this.chatEmitter.emitChange({ chat })

    return success({ chat })
  }
}
