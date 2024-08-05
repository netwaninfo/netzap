import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { WAEntityID } from './value-objects/wa-entity-id'

export interface ContactProps {
	waId: WAEntityID
	instanceId: UniqueEntityID
	name: string
	phone: string
	imageUrl: string | null
	isInstance: boolean
	isMe: boolean
	isMyContact: boolean
}

export class Contact extends Entity<ContactProps> {
	get waId() {
		return this.props.waId
	}

	get instanceId() {
		return this.props.instanceId
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

	get isMe() {
		return this.props.isMe
	}

	get isMyContact() {
		return this.props.isMyContact
	}

	get isUnknown() {
		return !this.props.isMyContact
	}

	static create(
		props: SetOptional<
			ContactProps,
			'imageUrl' | 'isInstance' | 'isMyContact' | 'isMe'
		>,
		id?: UniqueEntityID,
	) {
		return new Contact(
			{
				...props,
				imageUrl: props.imageUrl ?? null,
				isInstance: props.isInstance ?? false,
				isMe: props.isMe ?? false,
				isMyContact: props.isMyContact ?? false,
			},
			id,
		)
	}
}
