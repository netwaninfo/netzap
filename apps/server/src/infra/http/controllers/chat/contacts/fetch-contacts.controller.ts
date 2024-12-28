import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import {
  type FetchContactsRequestParams,
  type FetchContactsRequestQuery,
  type FetchContactsResponseBody,
  fetchContactsRequestParamsSchema,
  fetchContactsRequestQuerySchema,
} from '@netzap/http/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { FetchContactsUseCase } from '@/domain/chat/application/use-cases/contacts/fetch-contacts-use-case.js'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-http-validation.pipe.js'
import { ContactPresenter } from '@/infra/presenters/chat/contact-presenter.js'
import { PaginationPresenter } from '@/infra/presenters/pagination-presenter.js'

const paramsSchema = new ZodHttpValidationPipe(fetchContactsRequestParamsSchema)
const querySchema = new ZodHttpValidationPipe(fetchContactsRequestQuerySchema)

@Controller('/wa/:instanceId/contacts')
export class FetchContactsController {
  constructor(private fetchContacts: FetchContactsUseCase) {}

  @Get()
  async handle(
    @Param(paramsSchema) params: FetchContactsRequestParams,
    @Query(querySchema) query: FetchContactsRequestQuery
  ): Promise<FetchContactsResponseBody> {
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
      data: contacts.map(ContactPresenter.toOutput),
      pagination: PaginationPresenter.toOutput(pagination),
    }
  }
}
