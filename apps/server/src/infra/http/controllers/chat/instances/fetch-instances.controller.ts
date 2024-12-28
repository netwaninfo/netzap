import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import {
  type FetchInstancesRequestQuery,
  type FetchInstancesResponseBody,
  fetchInstancesRequestQuerySchema,
} from '@netzap/http/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { FetchInstancesUseCase } from '@/domain/chat/application/use-cases/instances/fetch-instances-use-case.js'
import { HttpUserId } from '@/infra/auth/decorators/http-user-id.decorator.js'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-http-validation.pipe.js'
import { InstancePresenter } from '@/infra/presenters/chat/instance-presenter.js'
import { PaginationPresenter } from '@/infra/presenters/pagination-presenter.js'

const querySchema = new ZodHttpValidationPipe(fetchInstancesRequestQuerySchema)

@Controller('/wa/instances')
export class FetchInstancesController {
  constructor(private fetchInstances: FetchInstancesUseCase) {}

  @Get()
  async handle(
    @HttpUserId() userId: string,
    @Query(querySchema) query: FetchInstancesRequestQuery
  ): Promise<FetchInstancesResponseBody> {
    const { page, limit, status } = query

    const response = await this.fetchInstances.execute({
      attendantId: UniqueEntityID.create(userId),
      page,
      limit,
      status,
    })

    if (response.isFailure()) {
      throw new BadRequestException()
    }

    const { instances, pagination } = response.value

    return {
      data: instances.map(InstancePresenter.toOutput),
      pagination: PaginationPresenter.toOutput(pagination),
    }
  }
}
