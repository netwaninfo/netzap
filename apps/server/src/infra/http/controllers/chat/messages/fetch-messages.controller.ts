import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchMessagesUseCase } from '@/domain/chat/application/use-cases/messages/fetch-messages-use-case'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { MessagePresenter } from '@/infra/presenters/chat/message-presenter'
import { PaginationPresenter } from '@/infra/presenters/pagination-presenter'
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
} from '@netzap/contracts/chat'

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
      data: messages.map(MessagePresenter.toHttp),
      pagination: PaginationPresenter.toHttp(pagination),
    }
  }
}
