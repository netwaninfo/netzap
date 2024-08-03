import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ContactInstanceDetailsList } from './contact-instance-details-list'
import type { WAEntityID } from './value-objects/wa-entity-id'

export interface ContactProps {
	waId: WAEntityID
	name: string
	phone: string
	imageUrl: string | null
	isInstance: boolean
	instancesDetails: ContactInstanceDetailsList
}

export class Contact extends Entity<ContactProps> {
	get waId() {
		return this.props.waId
	}

	get name() {
		return this.props.name
	}

	get phone() {
		return this.props.phone
	}

	get imageUrl() {
		return this.props.imageUrl
	}

	get isInstance() {
		return this.props.isInstance
	}

	static create(
		props: SetOptional<
			ContactProps,
			'imageUrl' | 'isInstance' | 'instancesDetails'
		>,
		id?: UniqueEntityID,
	) {
		return new Contact(
			{
				...props,
				imageUrl: props.imageUrl ?? null,
				isInstance: props.isInstance ?? false,
				instancesDetails:
					props.instancesDetails ?? ContactInstanceDetailsList.create([]),
			},
			id,
		)
	}
}
