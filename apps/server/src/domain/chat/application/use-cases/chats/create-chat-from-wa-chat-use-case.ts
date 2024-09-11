import { type Either, failure, success } from '@/core/either'
import { isWAGroupChat } from '@/domain/chat/enterprise/type-guards/wa-chat'
import type { Chat } from '@/domain/chat/enterprise/types/chat'
import type { WAChat } from '@/domain/chat/enterprise/types/wa-chat'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import type { CreateGroupChatFromWAChatUseCase } from './create-group-chat-from-wa-chat-use-case'
import type { CreatePrivateChatFromWAChatUseCase } from './create-private-chat-from-wa-chat-use-case'

interface CreateChatFromWAChatUseCaseRequest {
  waChat: WAChat
}

type CreateChatFromWAChatUseCaseResponse = Either<
  ResourceAlreadyExistsError | null,
  {
    chat: Chat
  }
>

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
