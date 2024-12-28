import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import { isWAPrivateMessage } from '@/domain/chat/enterprise/type-guards/wa-message.js'
import type { Message } from '@/domain/chat/enterprise/types/message.js'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message.js'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import type { ResourceAlreadyExistsError } from '@/domain/shared/errors/resource-already-exists-error.js'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { CreateGroupMessageFromWAMessageUseCase } from './group/create-group-message-from-wa-message-use-case.js'
import { CreatePrivateMessageFromWAMessageUseCase } from './private/create-private-message-from-wa-message-use-case.js'

interface CreateMessageFromWAMessageUseCaseRequest {
  waMessage: WAMessage
}

type CreateMessageFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | ResourceAlreadyExistsError
  | null,
  {
    message: Message
  }
>

@Injectable()
export class CreateMessageFromWAMessageUseCase {
  constructor(
    private createPrivateMessageFromWAMessage: CreatePrivateMessageFromWAMessageUseCase,
    private createGroupMessageFromWAMessage: CreateGroupMessageFromWAMessageUseCase
  ) {}

  async execute(
    request: CreateMessageFromWAMessageUseCaseRequest
  ): Promise<CreateMessageFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    if (isWAPrivateMessage(waMessage)) {
      const response = await this.createPrivateMessageFromWAMessage.execute({
        waMessage,
      })

      if (response.isFailure()) return failure(response.value)
      const { message } = response.value

      return success({ message })
    }

    const response = await this.createGroupMessageFromWAMessage.execute({
      waMessage,
    })

    if (response.isFailure()) return failure(response.value)
    const { message } = response.value

    return success({ message })
  }
}
