import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { isWAPrivateMessage } from '@/domain/chat/enterprise/type-guards/wa-message'
import type { Message } from '@/domain/chat/enterprise/types/message'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { CreateGroupTextMessageFromWAMessageUseCase } from './group/create-group-text-message-from-wa-message-use-case'
import type { CreatePrivateTextMessageFromWAMessageUseCase } from './private/create-private-text-message-from-wa-message-use-case'

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
