import { type Either, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Chat } from '@/domain/chat/enterprise/types/chat'
import { Pagination } from '@/domain/shared/entities/pagination'
import type { PaginationRequest } from '@/domain/shared/use-cases/pagination-request'
import type { ChatsRepository } from '../../repositories/chats-repository'

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

export class FetchChatsUseCase {
	constructor(private chatsRepository: ChatsRepository) {}

	async execute(
		request: FetchChatsUseCaseRequest,
	): Promise<FetchChatsUseCaseResponse> {
		const { instanceId, page } = request

		const take = Pagination.limit(100)

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
