import { type Either, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import { Pagination } from '@/domain/shared/entities/pagination.js'
import type { PaginationRequest } from '@/domain/shared/use-cases/pagination-request.js'
import { Injectable } from '@nestjs/common'
import { ChatsRepository } from '../../repositories/chats-repository.js'

interface FetchChatsUseCaseRequest extends PaginationRequest {
  instanceId: UniqueEntityID
}

type FetchChatsUseCaseResponse = Either<
  null,
  {
    chats: Chat[]
    pagination: Pagination
  }
>

@Injectable()
export class FetchChatsUseCase {
  constructor(private chatsRepository: ChatsRepository) {}

  async execute(
    request: FetchChatsUseCaseRequest
  ): Promise<FetchChatsUseCaseResponse> {
    const { instanceId, page } = request

    const take = Pagination.limit(request.limit ?? 100)

    const [rows, chats] = await Promise.all([
      this.chatsRepository.countByInstanceId({
        instanceId,
      }),
      this.chatsRepository.findManyPaginatedByInstanceId({
        instanceId,
        page,
        take,
      }),
    ])

    const pagination = Pagination.create({ limit: take, page, rows })

    return success({
      chats,
      pagination,
    })
  }
}
