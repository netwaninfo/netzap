import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Chat } from '@/domain/chat/enterprise/types/chat'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { WhatsAppService } from '../../services/whats-app-service'
import { CreateChatFromWAChatUseCase } from './create-chat-from-wa-chat-use-case'

interface ImportChatsFromInstanceUseCaseRequest {
  instanceId: UniqueEntityID
}

type ImportChatsFromInstanceUseCaseResponse = Either<
  UnhandledError | ServiceUnavailableError | ResourceAlreadyExistsError | null,
  {
    chats: Chat[]
  }
>

@Injectable()
export class ImportChatsFromInstanceUseCase {
  constructor(
    private createChatFromWAChat: CreateChatFromWAChatUseCase,
    private whatsAppService: WhatsAppService
  ) {}

  async execute(
    request: ImportChatsFromInstanceUseCaseRequest
  ): Promise<ImportChatsFromInstanceUseCaseResponse> {
    const { instanceId } = request

    const response = await this.whatsAppService.getChatsFromInstance({
      instanceId,
    })

    if (response.isFailure()) return failure(response.value)

    const waChats = response.value
    const chats: Chat[] = []

    for (const waChat of waChats) {
      const response = await this.createChatFromWAChat.execute({ waChat })

      if (response.isSuccess()) {
        const { chat } = response.value
        chats.push(chat)
      }
    }

    return success({ chats })
  }
}
