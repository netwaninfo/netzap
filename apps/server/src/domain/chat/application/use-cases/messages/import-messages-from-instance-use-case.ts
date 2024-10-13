import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Message } from '@/domain/chat/enterprise/types/message'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { ChunkProcessor } from '@/domain/shared/processors/chunk-processor'
import { WhatsAppService } from '../../services/whats-app-service'
import { CreateMessageFromWAMessageUseCase } from './create-message-from-wa-message-use-case'

interface ImportMessagesFromInstanceUseCaseRequest {
  instanceId: UniqueEntityID
}

type ImportMessagesFromInstanceUseCaseResponse = Either<
  UnhandledError | ServiceUnavailableError | ResourceAlreadyExistsError | null,
  {
    messages: Message[]
  }
>

@Injectable()
export class ImportMessagesFromInstanceUseCase {
  constructor(
    private createMessageFromWAMessage: CreateMessageFromWAMessageUseCase,
    private whatsAppService: WhatsAppService
  ) {}

  async execute(
    request: ImportMessagesFromInstanceUseCaseRequest
  ): Promise<ImportMessagesFromInstanceUseCaseResponse> {
    const { instanceId } = request

    const response = await this.whatsAppService.getMessagesFromInstance({
      instanceId,
    })

    if (response.isFailure()) return failure(response.value)
    const waMessages = response.value

    const messages: Message[] = []
    await ChunkProcessor.fromArray({ array: waMessages }).processChunk(
      async chunk => {
        for (const waMessage of chunk) {
          const response = await this.createMessageFromWAMessage.execute({
            waMessage,
          })

          if (response.isFailure()) return
          const { message } = response.value

          messages.push(message)
        }
      }
    )

    return success({ messages })
  }
}
