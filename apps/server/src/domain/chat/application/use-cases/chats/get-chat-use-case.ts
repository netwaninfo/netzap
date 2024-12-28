import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../repositories/chats-repository.js'
import { WhatsAppService } from '../../services/whats-app-service.js'
import { CreateChatFromWAChatUseCase } from './create-chat-from-wa-chat-use-case.js'

interface GetChatUseCaseRequest {
  instanceId: UniqueEntityID
  waChatId: WAEntityID
}

type GetChatUseCaseResponse = Either<
  ServiceUnavailableError | UnhandledError | ResourceAlreadyExistsError | null,
  {
    chat: Chat
  }
>

@Injectable()
export class GetChatUseCase {
  constructor(
    private chatsRepository: ChatsRepository,
    private createChatFromWAChat: CreateChatFromWAChatUseCase,
    private whatsAppService: WhatsAppService
  ) {}

  async execute(
    request: GetChatUseCaseRequest
  ): Promise<GetChatUseCaseResponse> {
    const { instanceId, waChatId } = request

    let chat = await this.chatsRepository.findUniqueByWAChatIdAndInstanceId({
      instanceId,
      waChatId,
    })

    if (!chat) {
      const getWAChatResponse = await this.whatsAppService.getChatByWAChatId({
        waChatId,
        instanceId,
      })

      if (getWAChatResponse.isFailure()) return failure(getWAChatResponse.value)
      const waChat = getWAChatResponse.value

      const createChatResponse = await this.createChatFromWAChat.execute({
        waChat,
      })

      if (createChatResponse.isFailure()) {
        return failure(createChatResponse.value)
      }

      chat = createChatResponse.value.chat
    }

    return success({ chat })
  }
}
