import { Injectable } from '@nestjs/common'
import type { InstanceStatus } from '@netzap/entities/management'

import { type Either, success } from '@/core/either.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Instance } from '@/domain/chat/enterprise/entities/instance.js'
import { Pagination } from '@/domain/shared/entities/pagination.js'
import type { PaginationRequest } from '@/domain/shared/use-cases/pagination-request.js'
import { InstancesRepository } from '../../repositories/instances-repository.js'

interface FetchInstancesUseCaseRequest extends PaginationRequest {
  status?: InstanceStatus
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
    const { attendantId, page, status } = request

    const take = Pagination.limit(request.limit)

    const [rows, instances] = await Promise.all([
      this.instancesRepository.countByAttendantId({ attendantId, status }),
      this.instancesRepository.findManyByAttendantId({
        attendantId,
        page,
        take,
        status,
      }),
    ])

    const pagination = Pagination.create({ limit: take, page, rows })

    return success({
      instances,
      pagination,
    })
  }
}
