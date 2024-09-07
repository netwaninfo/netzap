import { type Either, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import type { Message } from '@/domain/chat/enterprise/types/message'
import { Pagination } from '@/domain/shared/entities/pagination'
import type { PaginationRequest } from '@/domain/shared/use-cases/pagination-request'
import { Injectable } from '@nestjs/common'
import type { MessagesRepository } from '../../repositories/messages-repository'

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
		request: FetchMessagesUseCaseRequest,
	): Promise<FetchMessagesUseCaseResponse> {
		const { instanceId, waChatId, page } = request

		const take = Pagination.limit(100)

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
