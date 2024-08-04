import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'

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

	static create(
		props: SetOptional<ContactInstanceDetailsProps, 'isMyContact'>,
		id?: UniqueEntityID,
	) {
		return new ContactInstanceDetails(
			{
				...props,
				isMyContact: props.isMyContact ?? false,
			},
			id,
		)
	}
}
