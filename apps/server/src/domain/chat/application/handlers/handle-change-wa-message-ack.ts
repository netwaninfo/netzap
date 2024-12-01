import { type Either, failure, success } from '@/core/either'
import type { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import type { MessageStatus } from '@netzap/entities/chat'
import type { Message } from '../../enterprise/types/message'
import type { WAMessage } from '../../enterprise/types/wa-message'
import { MessageEmitter } from '../emitters/message-emitter'
import { MessagesRepository } from '../repositories/messages-repository'

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
