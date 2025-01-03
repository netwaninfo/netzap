import { type Either, failure, success } from '@/core/either.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { Injectable } from '@nestjs/common'
import type { Chat } from '../../enterprise/types/chat.js'
import type { WAChat } from '../../enterprise/types/wa-chat.js'
import { ChatEmitter } from '../emitters/chat-emitter.js'
import { ChatsRepository } from '../repositories/chats-repository.js'

interface HandleChangeWAChatUnreadCountRequest {
  waChat: WAChat
}

type HandleChangeWAChatUnreadCountResponse = Either<
  ResourceNotFoundError,
  {
    chat: Chat
  }
>
@Injectable()
export class HandleChangeWAChatUnreadCount {
  constructor(
    private chatsRepository: ChatsRepository,
    private chatEmitter: ChatEmitter
  ) {}

  async execute(
    request: HandleChangeWAChatUnreadCountRequest
  ): Promise<HandleChangeWAChatUnreadCountResponse> {
    const { waChat } = request

    const chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
      instanceId: waChat.instanceId,
      waChatId: waChat.id,
    })

    if (!chat) {
      return failure(new ResourceNotFoundError({ id: waChat.id.toString() }))
    }

    chat.setUnreadCount(waChat.unreadCount)
    await this.chatsRepository.setUnreadCount(chat)

    this.chatEmitter.emitChange({ chat })

    return success({ chat })
  }
}
