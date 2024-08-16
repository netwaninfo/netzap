import type {
	AttendantsRepository,
	AttendantsRepositoryFindUniqueByIdAndInstanceIdParams,
} from '@/domain/chat/application/repositories/attendants-repository'
import type { Attendant } from '@/domain/chat/enterprise/entities/attendant'

export class InMemoryAttendantsRepository implements AttendantsRepository {
	items: Attendant[] = []

	async findUniqueByIdAndInstanceId({
		attendantId,
		instanceId,
	}: AttendantsRepositoryFindUniqueByIdAndInstanceIdParams): Promise<Attendant | null> {
		const item = this.items.find(
			(item) =>
				item.id.equals(attendantId) && item.instanceId.equals(instanceId),
		)

		return item ?? null
	}
}
