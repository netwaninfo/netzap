import { type Either, failure, success } from '@/core/either.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { Injectable } from '@nestjs/common'
import {
  isMessageCanRevoke,
  isMessageWithMedia,
} from '../../enterprise/type-guards/message.js'
import type { Message } from '../../enterprise/types/message.js'
import type { WAChat } from '../../enterprise/types/wa-chat.js'
import type { WAMessage } from '../../enterprise/types/wa-message.js'
import { MessageEmitter } from '../emitters/message-emitter.js'
import { MessagesRepository } from '../repositories/messages-repository.js'
import { DateService } from '../services/date-service.js'
import { StorageService } from '../services/storage-service.js'

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
