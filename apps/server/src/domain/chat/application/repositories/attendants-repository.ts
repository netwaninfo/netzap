import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Attendant } from '../../enterprise/entities/attendant'

export interface AttendantsRepositoryFindUniqueByAttendantIdAndInstanceIdParams {
	attendantId: UniqueEntityID
	instanceId: UniqueEntityID
}

export abstract class AttendantsRepository {
	abstract findUniqueByAttendantIdAndInstanceId(
		params: AttendantsRepositoryFindUniqueByAttendantIdAndInstanceIdParams,
	): Promise<Attendant | null>
}
