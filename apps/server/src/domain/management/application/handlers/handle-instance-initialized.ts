import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { Instance } from '../../enterprise/entities/instance'
import type { InstancesRepository } from '../repositories/instances-repository'

interface HandleInstanceInitializedRequest {
	instanceId: UniqueEntityID
	qrCode: string
}

type HandleInstanceInitializedResponse = Either<
	ResourceNotFoundError,
	{
		instance: Instance
	}
>

export class HandleInstanceInitialized {
	constructor(private instancesRepository: InstancesRepository) {}

	async execute(
		request: HandleInstanceInitializedRequest,
	): Promise<HandleInstanceInitializedResponse> {
		const { instanceId, qrCode } = request

		const instance = await this.instancesRepository.findUniqueById(instanceId)
		if (!instance) {
			return failure(new ResourceNotFoundError({ id: instanceId.toString() }))
		}

		instance.initialized(qrCode)
		await this.instancesRepository.save(instance)

		return success({ instance })
	}
}
