import { type Either, failure, success } from '@/core/either.js'
import { isWAGroupChat } from '@/domain/chat/enterprise/type-guards/wa-chat.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import type { WAChat } from '@/domain/chat/enterprise/types/wa-chat.js'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { Injectable } from '@nestjs/common'
import { CreateGroupChatFromWAChatUseCase } from './create-group-chat-from-wa-chat-use-case.js'
import { CreatePrivateChatFromWAChatUseCase } from './create-private-chat-from-wa-chat-use-case.js'

interface CreateChatFromWAChatUseCaseRequest {
  waChat: WAChat
}

export type CreateChatFromWAChatUseCaseResponse = Either<
  ResourceAlreadyExistsError | null,
  {
    chat: Chat
  }
>

@Injectable()
export class CreateChatFromWAChatUseCase {
  constructor(
    private createGroupChatFromWAChat: CreateGroupChatFromWAChatUseCase,
    private createPrivateChatFromWAChat: CreatePrivateChatFromWAChatUseCase
  ) {}

  async execute(
    request: CreateChatFromWAChatUseCaseRequest
  ): Promise<CreateChatFromWAChatUseCaseResponse> {
    const { waChat } = request
    let chat: Chat

    if (isWAGroupChat(waChat)) {
      const response = await this.createGroupChatFromWAChat.execute({ waChat })

      if (response.isFailure()) return failure(response.value)
      chat = response.value.chat
    } else {
      const response = await this.createPrivateChatFromWAChat.execute({
        waChat,
      })

      if (response.isFailure()) return failure(response.value)
      chat = response.value.chat
    }

    return success({
      chat,
    })
  }
}
