import type { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import type { Attendant } from '../../enterprise/entities/attendant.js'

export interface AttendantsRepositoryFindUniqueByAttendantIdAndInstanceIdParams {
  attendantId: UniqueEntityID
  instanceId: UniqueEntityID
}

export abstract class AttendantsRepository {
  abstract findUniqueByAttendantIdAndInstanceId(
    params: AttendantsRepositoryFindUniqueByAttendantIdAndInstanceIdParams
  ): Promise<Attendant | null>
}
