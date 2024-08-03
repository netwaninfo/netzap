import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface ContactInstanceDetailsProps {
	contactId: UniqueEntityID
	instanceId: UniqueEntityID
	isMyContact: boolean
}

export class ContactInstanceDetails extends Entity<ContactInstanceDetailsProps> {
	get contactId() {
		return this.props.contactId
	}

	get instanceId() {
		return this.props.instanceId
	}

	get isMyContact() {
		return this.props.isMyContact
	}

	get isUnknown() {
		return !this.props.isMyContact
	}

	static create(props: ContactInstanceDetailsProps, id?: UniqueEntityID) {
		return new ContactInstanceDetails({ ...props }, id)
	}
}
