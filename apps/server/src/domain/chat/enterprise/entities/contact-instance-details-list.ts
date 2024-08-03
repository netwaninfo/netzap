import { WatchedList } from '@/core/entities/watched-list'
import type { ContactInstanceDetails } from './contact-instance-details'

export class ContactInstanceDetailsList extends WatchedList<ContactInstanceDetails> {
	compareItems(a: ContactInstanceDetails, b: ContactInstanceDetails): boolean {
		return a.equals(b)
	}

	static create(initialItems: ContactInstanceDetails[]) {
		return new ContactInstanceDetailsList(initialItems)
	}
}
