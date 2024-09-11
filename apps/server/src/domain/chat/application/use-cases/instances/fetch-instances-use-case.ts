import { Either, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Instance } from '@/domain/chat/enterprise/entities/instance'
import { Pagination } from '@/domain/shared/entities/pagination'
import { PaginationRequest } from '@/domain/shared/use-cases/pagination-request'
import { Injectable } from '@nestjs/common'
import { InstancesRepository } from '../../repositories/instances-repository'

interface FetchInstancesUseCaseRequest extends PaginationRequest {
  attendantId: UniqueEntityID
}

type FetchInstancesUseCaseResponse = Either<
  null,
  {
    instances: Instance[]
    pagination: Pagination
  }
>

@Injectable()
export class FetchInstancesUseCase {
  constructor(private instancesRepository: InstancesRepository) {}

  async execute(
    request: FetchInstancesUseCaseRequest
  ): Promise<FetchInstancesUseCaseResponse> {
    const { attendantId, page, limit } = request

    const take = Pagination.limit(limit)

    const [rows, instances] = await Promise.all([
      this.instancesRepository.countByAttendantId({ attendantId }),
      this.instancesRepository.findManyByAttendantId({
        attendantId,
        page,
        take,
      }),
    ])

    const pagination = Pagination.create({ limit: take, page, rows })

    return success({
      instances,
      pagination,
    })
  }
}
