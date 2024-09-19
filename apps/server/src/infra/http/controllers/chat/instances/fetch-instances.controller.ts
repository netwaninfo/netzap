import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { FetchInstancesUseCase } from '@/domain/chat/application/use-cases/instances/fetch-instances-use-case'
import { UserId } from '@/infra/auth/decorators/user-id.decorator'
import { ZodHttpValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { InstancePresenter } from '@/infra/presenters/chat/instance-presenter'
import { PaginationPresenter } from '@/infra/presenters/pagination-presenter'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import {
  type FetchInstancesRequestQuery,
  type FetchInstancesResponseBody,
  fetchInstancesRequestQuerySchema,
} from '@netzap/contracts/chat'

const querySchema = new ZodHttpValidationPipe(fetchInstancesRequestQuerySchema)

@Controller('/wa/instances')
export class FetchInstancesController {
  constructor(private fetchInstances: FetchInstancesUseCase) {}

  @Get()
  async handle(
    @UserId() userId: string,
    @Query(querySchema) query: FetchInstancesRequestQuery
  ): Promise<FetchInstancesResponseBody> {
    const { page, limit } = query

    const response = await this.fetchInstances.execute({
      attendantId: UniqueEntityID.create(userId),
      page,
      limit,
    })

    if (response.isFailure()) {
      throw new BadRequestException()
    }

    const { instances, pagination } = response.value

    return {
      data: instances.map(InstancePresenter.toHttp),
      pagination: PaginationPresenter.toHttp(pagination),
    }
  }
}