import { type Either, failure, success } from '@/core/either'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/domain/shared/errors/resource-not-found-error'
import type { Instance } from '../../enterprise/entities/instance'
import type { InstancesRepository } from '../repositories/instances-repository'

interface HandleInstanceConnectedRequest {
	instanceId: UniqueEntityID
}

type HandleInstanceConnectedResponse = Either<
	ResourceNotFoundError,
	{
		instance: Instance
	}
>

export class HandleInstanceConnected {
	constructor(private instancesRepository: InstancesRepository) {}

	async execute(
		request: HandleInstanceConnectedRequest,
	): Promise<HandleInstanceConnectedResponse> {
		const { instanceId } = request

		const instance = await this.instancesRepository.findUniqueByInstanceId({
			instanceId,
		})

		if (!instance) {
			return failure(new ResourceNotFoundError({ id: instanceId.toString() }))
		}

		instance.connected()
		await this.instancesRepository.save(instance)

		return success({ instance })
	}
}
