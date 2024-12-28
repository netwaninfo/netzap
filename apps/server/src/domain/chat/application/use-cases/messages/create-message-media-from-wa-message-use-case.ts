import { Readable } from 'node:stream'
import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import { MessageMedia } from '@/domain/chat/enterprise/entities/message-media.js'
import type { WAMessage } from '@/domain/chat/enterprise/types/wa-message.js'
import { InvalidResourceFormatError } from '@/domain/shared/errors/invalid-resource-format.js'
import type { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import { ServiceUnavailableError } from '@/domain/shared/errors/service-unavailable-error.js'
import { UnhandledError } from '@/domain/shared/errors/unhandled-error.js'
import { StorageService } from '../../services/storage-service.js'

interface CreateMessageMediaFromWAMessageUseCaseRequest {
  waMessage: WAMessage
}

type CreateMessageMediaFromWAMessageUseCaseResponse = Either<
  | ResourceNotFoundError
  | InvalidResourceFormatError
  | UnhandledError
  | ServiceUnavailableError,
  {
    media: MessageMedia
  }
>

@Injectable()
export class CreateMessageMediaFromWAMessageUseCase {
  constructor(private storageService: StorageService) {}

  async execute(
    request: CreateMessageMediaFromWAMessageUseCaseRequest
  ): Promise<CreateMessageMediaFromWAMessageUseCaseResponse> {
    const { waMessage } = request

    if (!waMessage.hasMedia()) {
      return failure(new InvalidResourceFormatError({ id: waMessage.ref }))
    }

    const waMessageMedia = waMessage.media

    const response = await this.storageService.put({
      filename: waMessage.ref,
      mimeType: waMessageMedia.mimeType,
      data: Readable.from(Buffer.from(waMessageMedia.data, 'base64')),
    })

    if (response.isFailure()) return failure(response.value)
    const { value: storageObject } = response

    const media = MessageMedia.create({
      key: storageObject.path,
      url: storageObject.url,
      mimeType: storageObject.mimeType,
    })

    return success({ media })
  }
}
