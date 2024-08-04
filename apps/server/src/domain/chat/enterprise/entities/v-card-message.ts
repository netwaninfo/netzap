import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { Message, type MessageProps } from './message'
import type { VCardContact } from './value-objects/v-card-contact'

export interface VCardMessageProps extends MessageProps {
	type: 'vcard'
	contact: VCardContact
}

export class VCardMessage extends Message<VCardMessageProps> {
	get type() {
		return this.props.type
	}

	get contact() {
		return this.props.contact
	}

	static create(
		props: SetOptional<
			VCardMessageProps,
			| 'type'
			| 'quotedId'
			| 'status'
			| 'isGif'
			| 'isForwarded'
			| 'isFromDevice'
			| 'sentBy'
			| 'createdAt'
		>,
		id?: UniqueEntityID,
	) {
		return new VCardMessage(
			{
				...props,
				type: 'vcard',
				quotedId: props.quotedId ?? null,
				status: props.status ?? 'pending',
				isGif: props.isGif ?? false,
				isForwarded: props.isForwarded ?? false,
				isFromDevice: props.isFromDevice ?? true,
				sentBy: props.sentBy ?? null,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)
	}
}
