import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchChatsUseCase } from '@/domain/chat/application/use-cases/chats/fetch-chats-use-case'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { ChatPresenter } from '@/infra/presenters/chat/chat-presenter'
import { PaginationPresenter } from '@/infra/presenters/pagination-presenter'
import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Query,
} from '@nestjs/common'
import {
	type ChatFetchChatsRequestParams,
	type ChatFetchChatsRequestQuery,
	type ChatFetchChatsResponseBody,
	chatFetchChatsRequestParamsSchema,
	chatFetchChatsRequestQuerySchema,
} from '@netzap/contracts/http'

const paramsSchema = new ZodHttpValidationPipe(
	chatFetchChatsRequestParamsSchema,
)

const querySchema = new ZodHttpValidationPipe(chatFetchChatsRequestQuerySchema)

@Controller('/wa/:instanceId/chats')
export class FetchChatsController {
	constructor(private fetchChats: FetchChatsUseCase) {}

	@Get()
	async handle(
		@Param(paramsSchema) params: ChatFetchChatsRequestParams,
		@Query(querySchema) query: ChatFetchChatsRequestQuery,
	): Promise<ChatFetchChatsResponseBody> {
		const { instanceId } = params
		const { page, limit } = query

		const response = await this.fetchChats.execute({
			instanceId: UniqueEntityID.create(instanceId),
			page,
			limit,
		})

		if (response.isFailure()) {
			throw new BadRequestException()
		}

		const { chats, pagination } = response.value

		return {
			data: chats.map(ChatPresenter.toHttp),
			pagination: PaginationPresenter.toHttp(pagination),
		}
	}
}
