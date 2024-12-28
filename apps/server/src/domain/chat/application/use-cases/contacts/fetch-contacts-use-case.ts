import { type Either, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Contact } from '@/domain/chat/enterprise/entities/contact.js'
import { Pagination } from '@/domain/shared/entities/pagination.js'
import type { PaginationRequest } from '@/domain/shared/use-cases/pagination-request.js'
import type { SearchRequest } from '@/domain/shared/use-cases/search-request.js'
import { Injectable } from '@nestjs/common'
import { ContactsRepository } from '../../repositories/contacts-repository.js'

interface FetchContactsUseCaseRequest extends PaginationRequest, SearchRequest {
  instanceId: UniqueEntityID
}

type FetchContactsUseCaseResponse = Either<
  null,
  {
    contacts: Contact[]
    pagination: Pagination
  }
>

@Injectable()
export class FetchContactsUseCase {
  constructor(private contactsRepository: ContactsRepository) {}

  async execute(
    request: FetchContactsUseCaseRequest
  ): Promise<FetchContactsUseCaseResponse> {
    const { instanceId, page, query } = request

    const limit = Pagination.limit(request.limit ?? 100)

    const [rows, contacts] = await Promise.all([
      this.contactsRepository.countByInstanceId({
        instanceId,
      }),
      this.contactsRepository.findManyPaginatedByInstanceId({
        instanceId,
        page,
        take: limit,
        query,
      }),
    ])

    const pagination = Pagination.create({ limit, page, rows })

    return success({
      contacts,
      pagination,
    })
  }
}
