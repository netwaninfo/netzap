import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Chat } from '@/domain/chat/enterprise/types/chat'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { ChunkProcessor } from '@/domain/shared/processors/chunk-processor'
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
    await ChunkProcessor.fromArray({ array: waChats }).processChunk(
      async chunk => {
        for (const waChat of chunk) {
          const response = await this.createChatFromWAChat.execute({
            waChat,
          })

          if (response.isFailure()) return
          const { chat } = response.value

          chats.push(chat)
        }
      }
    )

    return success({ chats })
  }
}
