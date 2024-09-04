import { type Either, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Contact } from '@/domain/chat/enterprise/entities/contact'
import { Pagination } from '@/domain/shared/entities/pagination'
import type { PaginationRequest } from '@/domain/shared/use-cases/pagination-request'
import type { SearchRequest } from '@/domain/shared/use-cases/search-request'
import { Injectable } from '@nestjs/common'
import type { ContactsRepository } from '../../repositories/contacts-repository'

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
		request: FetchContactsUseCaseRequest,
	): Promise<FetchContactsUseCaseResponse> {
		const { instanceId, page } = request

		const limit = Pagination.limit(100)

		const [rows, contacts] = await Promise.all([
			this.contactsRepository.countByInstanceId({
				instanceId,
			}),
			this.contactsRepository.findManyPaginatedByInstanceId({
				instanceId,
				page,
				take: limit,
			}),
		])

		const pagination = Pagination.create({ limit, page, rows })

		return success({
			contacts,
			pagination,
		})
	}
}
