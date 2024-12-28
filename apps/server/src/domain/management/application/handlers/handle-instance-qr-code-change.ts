import { Injectable } from '@nestjs/common'

import { type Either, failure, success } from '@/core/either.js'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error.js'
import type { Instance } from '../../enterprise/entities/instance.js'
import { InstancesRepository } from '../repositories/instances-repository.js'

interface HandleInstanceQRCodeChangeRequest {
  instanceId: UniqueEntityID
  qrCode: string
}

type HandleInstanceQRCodeChangeResponse = Either<
  ResourceNotFoundError,
  {
    instance: Instance
  }
>

@Injectable()
export class HandleInstanceQRCodeChange {
  constructor(private instancesRepository: InstancesRepository) {}

  async execute(
    request: HandleInstanceQRCodeChangeRequest
  ): Promise<HandleInstanceQRCodeChangeResponse> {
    const { instanceId, qrCode } = request

    const instance = await this.instancesRepository.findUniqueByInstanceId({
      instanceId,
    })

    if (!instance) {
      return failure(new ResourceNotFoundError({ id: instanceId.toString() }))
    }

    instance.changeQRCode(qrCode)
    await this.instancesRepository.save(instance)

    return success({ instance })
  }
}
