import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import type { Instance } from '../../enterprise/entities/instance'
import { InstancesRepository } from '../repositories/instances-repository'

interface HandleInstanceDisconnectedRequest {
  instanceId: UniqueEntityID
}

type HandleInstanceDisconnectedResponse = Either<
  ResourceNotFoundError,
  {
    instance: Instance
  }
>

@Injectable()
export class HandleInstanceDisconnected {
  constructor(private instancesRepository: InstancesRepository) {}

  async execute(
    request: HandleInstanceDisconnectedRequest
  ): Promise<HandleInstanceDisconnectedResponse> {
    const { instanceId } = request

    const instance = await this.instancesRepository.findUniqueByInstanceId({
      instanceId,
    })

    if (!instance) {
      return failure(new ResourceNotFoundError({ id: instanceId.toString() }))
    }

    instance.disconnected()
    await this.instancesRepository.save(instance)

    return success({ instance })
  }
}
