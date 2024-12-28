import { Injectable } from '@nestjs/common'

import { type Either, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import type { Message } from '@/domain/chat/enterprise/types/message.js'
import { Pagination } from '@/domain/shared/entities/pagination.js'
import type { PaginationRequest } from '@/domain/shared/use-cases/pagination-request.js'
import { MessagesRepository } from '../../repositories/messages-repository.js'

interface FetchMessagesUseCaseRequest extends PaginationRequest {
  instanceId: UniqueEntityID
  waChatId: WAEntityID
}

type FetchMessagesUseCaseResponse = Either<
  null,
  {
    messages: Message[]
    pagination: Pagination
  }
>

@Injectable()
export class FetchMessagesUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(
    request: FetchMessagesUseCaseRequest
  ): Promise<FetchMessagesUseCaseResponse> {
    const { instanceId, waChatId, page } = request

    const take = Pagination.limit(request.limit ?? 100)

    const [rows, messages] = await Promise.all([
      this.messagesRepository.countByInstanceIdAndWAChatId({
        instanceId,
        waChatId,
      }),
      this.messagesRepository.findManyPaginatedByInstanceIdAndWAChatId({
        instanceId,
        waChatId,
        page,
        take,
      }),
    ])

    const pagination = Pagination.create({ limit: take, page, rows })

    return success({
      messages,
      pagination,
    })
  }
}
