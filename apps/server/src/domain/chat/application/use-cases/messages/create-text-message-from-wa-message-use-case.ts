import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { isWAPrivateMessage } from '@/domain/chat/enterprise/type-guards/wa-message.js'
import type { Message } from '@/domain/chat/enterprise/types/message.js'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message.js'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { CreateGroupTextMessageFromWAMessageUseCase } from './group/create-group-text-message-from-wa-message-use-case.js'
import { CreatePrivateTextMessageFromWAMessageUseCase } from './private/create-private-text-message-from-wa-message-use-case.js'

interface CreateTextMessageFromWAMessageUseCaseRequest {
  waMessage: WAMessage
  attendantId?: UniqueEntityID
}

type CreateTextMessageFromWAMessageUseCaseResponse = Either<
  ResourceNotFoundError | InvalidResourceFormatError,
  {
    message: Message
  }
>

@Injectable()
export class CreateTextMessageFromWAMessageUseCase {
  constructor(
    private createPrivateTextMessageFromWAMessage: CreatePrivateTextMessageFromWAMessageUseCase,
    private createGroupTextMessageFromWAMessage: CreateGroupTextMessageFromWAMessageUseCase
  ) {}

  async execute(
    request: CreateTextMessageFromWAMessageUseCaseRequest
  ): Promise<CreateTextMessageFromWAMessageUseCaseResponse> {
    const { waMessage, attendantId } = request

    if (isWAPrivateMessage(waMessage)) {
      const response = await this.createPrivateTextMessageFromWAMessage.execute(
        {
          waMessage,
          attendantId,
        }
      )

      if (response.isFailure()) return failure(response.value)
      const { message } = response.value

      return success({ message })
    }

    const response = await this.createGroupTextMessageFromWAMessage.execute({
      waMessage,
      attendantId,
    })

    if (response.isFailure()) return failure(response.value)
    const { message } = response.value

    return success({ message })
  }
}
