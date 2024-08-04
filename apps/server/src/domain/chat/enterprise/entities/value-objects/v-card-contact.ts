import type { SetOptional } from 'type-fest'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import type { WAEntityID } from './wa-entity-id'

export interface VCardContactProps {
	waId: WAEntityID
	name: string
	phone: string
	imageUrl: string | null
	isInstance: boolean
	isMyContact: boolean
}

export class VCardContact extends ValueObject<VCardContactProps> {
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

	get isMyContact() {
		return this.props.isMyContact
	}

	get isUnknown() {
		return !this.props.isMyContact
	}

	static create(
		props: SetOptional<
			VCardContactProps,
			'imageUrl' | 'isInstance' | 'isMyContact'
		>,
		id?: UniqueEntityID,
	) {
		return new VCardContact({
			...props,
			imageUrl: props.imageUrl ?? null,
			isInstance: props.isInstance ?? false,
			isMyContact: props.isMyContact ?? false,
		})
	}
}
