import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchContactsUseCase } from '@/domain/chat/application/use-cases/contacts/fetch-contacts-use-case'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { ContactPresenter } from '@/infra/presenters/chat/contact-presnter'
import { PaginationPresenter } from '@/infra/presenters/pagination-presenter'
import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Query,
} from '@nestjs/common'
import {
	type ChatFetchContactsByInstanceRequestQuery,
	type ChatFetchContactsByInstancesRequestParams,
	type FetchContactsByInstanceResponseBody,
	chatFetchContactsByInstanceRequestQuerySchema,
	chatFetchContactsByInstancesRequestParamsSchema,
} from '@netzap/contracts/http'

const paramsSchema = new ZodHttpValidationPipe(
	chatFetchContactsByInstancesRequestParamsSchema,
)

const querySchema = new ZodHttpValidationPipe(
	chatFetchContactsByInstanceRequestQuerySchema,
)

@Controller('/wa/:instanceId/contacts')
export class FetchContactsByInstanceController {
	constructor(private fetchContacts: FetchContactsUseCase) {}

	@Get()
	async handle(
		@Param(paramsSchema) params: ChatFetchContactsByInstancesRequestParams,
		@Query(querySchema) query: ChatFetchContactsByInstanceRequestQuery,
	): Promise<FetchContactsByInstanceResponseBody> {
		const { instanceId } = params
		const { page, limit, q } = query

		const response = await this.fetchContacts.execute({
			instanceId: UniqueEntityID.create(instanceId),
			query: q,
			page,
			limit,
		})

		if (response.isFailure()) {
			throw new BadRequestException()
		}

		const { contacts, pagination } = response.value

		return {
			data: contacts.map(ContactPresenter.toHttp),
			pagination: PaginationPresenter.toHttp(pagination),
		}
	}
}
