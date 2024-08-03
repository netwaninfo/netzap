import { WatchedList } from '@/core/entities/watched-list'

import type { Instance } from './instance'

export class AttendantInstanceList extends WatchedList<Instance> {
	compareItems(a: Instance, b: Instance): boolean {
		return a.equals(b)
	}

	static create(initialItems: Instance[]) {
		return new AttendantInstanceList(initialItems)
	}
}
