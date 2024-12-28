import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Message } from '@/domain/chat/enterprise/types/message.js'
import { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { ChunkProcessor } from '@/domain/shared/processors/chunk-processor.js'
import { ParallelProcessor } from '@/domain/shared/processors/parallel-processor.js'
import { WhatsAppService } from '../../services/whats-app-service.js'
import { CreateMessageFromWAMessageUseCase } from './create-message-from-wa-message-use-case.js'

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
    await ChunkProcessor.fromAmount({ array: waMessages }).processChunk(
      async chunk => {
        await ParallelProcessor.create({ items: chunk }).processItem(
          async waMessage => {
            const response = await this.createMessageFromWAMessage.execute({
              waMessage,
            })

            if (response.isFailure()) return
            const { message } = response.value

            messages.push(message)
          }
        )
      }
    )

    return success({ messages })
  }
}
