import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import type { Instance } from '../../enterprise/entities/instance.js'
import { InstancesRepository } from '../repositories/instances-repository.js'

interface HandleInstanceStartingRequest {
  instanceId: UniqueEntityID
}

type HandleInstanceStartingResponse = Either<
  ResourceNotFoundError,
  {
    instance: Instance
  }
>

@Injectable()
export class HandleInstanceStarting {
  constructor(private instancesRepository: InstancesRepository) {}

  async execute(
    request: HandleInstanceStartingRequest
  ): Promise<HandleInstanceStartingResponse> {
    const { instanceId } = request

    const instance = await this.instancesRepository.findUniqueByInstanceId({
      instanceId,
    })

    if (!instance) {
      return failure(new ResourceNotFoundError({ id: instanceId.toString() }))
    }

    instance.starting()
    await this.instancesRepository.save(instance)

    return success({ instance })
  }
}
