import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import type { Instance } from '../../enterprise/entities/instance.js'
import { InstancesRepository } from '../repositories/instances-repository.js'

interface HandleInstanceStoppedRequest {
  instanceId: UniqueEntityID
}

type HandleInstanceStoppedResponse = Either<
  ResourceNotFoundError,
  {
    instance: Instance
  }
>

@Injectable()
export class HandleInstanceStopped {
  constructor(private instancesRepository: InstancesRepository) {}

  async execute(
    request: HandleInstanceStoppedRequest
  ): Promise<HandleInstanceStoppedResponse> {
    const { instanceId } = request

    const instance = await this.instancesRepository.findUniqueByInstanceId({
      instanceId,
    })

    if (!instance) {
      return failure(new ResourceNotFoundError({ id: instanceId.toString() }))
    }

    instance.stopped()
    await this.instancesRepository.save(instance)

    return success({ instance })
  }
}
