import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Attendant } from '../../enterprise/entities/attendant'

export interface AttendantsRepositoryFindUniqueByIdAndInstanceIdParams {
	attendantId: UniqueEntityID
	instanceId: UniqueEntityID
}

export abstract class AttendantsRepository {
	abstract findUniqueByIdAndInstanceId(
		params: AttendantsRepositoryFindUniqueByIdAndInstanceIdParams,
	): Promise<Attendant | null>
}
