import { type Either, failure, success } from '@/core/either.js'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { Injectable } from '@nestjs/common'
import type { MessageStatus } from '@netzap/entities/chat'
import type { Message } from '../../enterprise/types/message.js'
import type { WAMessage } from '../../enterprise/types/wa-message.js'
import { MessageEmitter } from '../emitters/message-emitter.js'
import { MessagesRepository } from '../repositories/messages-repository.js'

interface HandleChangeWAMessageACKRequest {
  waMessage: WAMessage
  ack: MessageStatus
}

type HandleChangeWAMessageACKResponse = Either<
  ResourceNotFoundError | InvalidResourceFormatError,
  {
    message: Message
  }
>
@Injectable()
export class HandleChangeWAMessageACK {
  constructor(
    private messagesRepository: MessagesRepository,
    private messageEmitter: MessageEmitter
  ) {}

  async execute(
    request: HandleChangeWAMessageACKRequest
  ): Promise<HandleChangeWAMessageACKResponse> {
    const { ack, waMessage } = request

    const message =
      await this.messagesRepository.findUniqueByWAMessageIdAndInstanceId({
        instanceId: waMessage.instanceId,
        waMessageId: waMessage.id,
      })

    if (!message) {
      return failure(new ResourceNotFoundError({ id: waMessage.ref }))
    }

    message.setStatus(ack)
    await this.messagesRepository.setStatus(message)
    this.messageEmitter.emitChange({ message })

    return success({ message })
  }
}
