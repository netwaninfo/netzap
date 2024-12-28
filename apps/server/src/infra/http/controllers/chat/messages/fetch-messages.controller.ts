import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import {
  type FetchMessagesRequestParams,
  type FetchMessagesRequestQuery,
  type FetchMessagesResponseBody,
  fetchMessagesRequestParamsSchema,
  fetchMessagesRequestQuerySchema,
} from '@netzap/http/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { FetchMessagesUseCase } from '@/domain/chat/application/use-cases/messages/fetch-messages-use-case.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-http-validation.pipe.js'
import { MessagePresenter } from '@/infra/presenters/chat/message-presenter.js'
import { PaginationPresenter } from '@/infra/presenters/pagination-presenter.js'

const querySchema = new ZodHttpValidationPipe(fetchMessagesRequestQuerySchema)
const paramsSchema = new ZodHttpValidationPipe(fetchMessagesRequestParamsSchema)

@Controller('/wa/:instanceId/chats/:waChatId/messages')
export class FetchMessagesController {
  constructor(private fetchMessages: FetchMessagesUseCase) {}

  @Get()
  async handle(
    @Param(paramsSchema) params: FetchMessagesRequestParams,
    @Query(querySchema) query: FetchMessagesRequestQuery
  ): Promise<FetchMessagesResponseBody> {
    const { instanceId, waChatId } = params
    const { page, limit } = query

    const response = await this.fetchMessages.execute({
      instanceId: UniqueEntityID.create(instanceId),
      waChatId: WAEntityID.createFromString(waChatId),
      page,
      limit,
    })

    if (response.isFailure()) {
      throw new BadRequestException()
    }

    const { messages, pagination } = response.value

    return {
      data: messages.map(MessagePresenter.toOutput),
      pagination: PaginationPresenter.toOutput(pagination),
    }
  }
}
