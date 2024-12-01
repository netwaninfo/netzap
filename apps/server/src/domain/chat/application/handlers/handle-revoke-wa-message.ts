import { type Either, failure, success } from '@/core/either'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error'
import { Injectable } from '@nestjs/common'
import {
  isMessageCanRevoke,
  isMessageWithMedia,
} from '../../enterprise/type-guards/message'
import type { Message } from '../../enterprise/types/message'
import type { WAChat } from '../../enterprise/types/wa-chat'
import type { WAMessage } from '../../enterprise/types/wa-message'
import { MessageEmitter } from '../emitters/message-emitter'
import { MessagesRepository } from '../repositories/messages-repository'
import { DateService } from '../services/date-service'
import { StorageService } from '../services/storage-service'

interface HandleRevokeWAMessageRequest {
  waRevokedMessage: WAMessage
  waChat: WAChat
}

type HandleRevokeWAMessageResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | UnhandledError
  | ServiceUnavailableError,
  {
    message: Message
  }
>

@Injectable()
export class HandleRevokeWAMessage {
  constructor(
    private messagesRepository: MessagesRepository,
    private dateService: DateService,
    private storageService: StorageService,
    private messageEmitter: MessageEmitter
  ) {}

  async execute(
    request: HandleRevokeWAMessageRequest
  ): Promise<HandleRevokeWAMessageResponse> {
    const { waChat, waRevokedMessage } = request

    const createdAtOfRevokedMessage = this.dateService
      .fromUnix(waRevokedMessage.timestamp)
      .toDate()

    const prevMessage =
      await this.messagesRepository.findUniqueByCreatedAtAndInstanceIdAndWAChatId(
        {
          instanceId: waRevokedMessage.instanceId,
          waChatId: waChat.id,
          createdAt: createdAtOfRevokedMessage,
        }
      )

    if (!prevMessage) {
      return failure(
        new ResourceNotFoundError({
          id: `${waChat.ref}/${waRevokedMessage.id.toString()}/${createdAtOfRevokedMessage.toISOString()}`,
        })
      )
    }

    if (isMessageWithMedia(prevMessage) && prevMessage.hasMedia()) {
      const response = await this.storageService.delete(prevMessage.media.key)
      if (response.isFailure()) return failure(response.value)
    }

    if (!isMessageCanRevoke(prevMessage)) {
      return failure(
        new InvalidResourceFormatError({ id: prevMessage.id.toString() })
      )
    }

    const message = prevMessage.revoke()
    await this.messagesRepository.setRevoked(message)
    this.messageEmitter.emitRevoked({ message })

    return success({ message })
  }
}
