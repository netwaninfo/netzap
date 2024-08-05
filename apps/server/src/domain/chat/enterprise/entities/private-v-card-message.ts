import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { PrivateMessage, type PrivateMessageProps } from './private-message'
import type { VCardContact } from './value-objects/v-card-contact'

export interface PrivateVCardMessageProps extends PrivateMessageProps {
	type: 'vcard'
	contact: VCardContact
}

export class PrivateVCardMessage extends PrivateMessage<PrivateVCardMessageProps> {
	get type() {
		return this.props.type
	}

	get contact() {
		return this.props.contact
	}

	static create(
		props: SetOptional<
			PrivateVCardMessageProps,
			| 'type'
			| 'quoted'
			| 'status'
			| 'isForwarded'
			| 'isFromDevice'
			| 'sentBy'
			| 'createdAt'
		>,
		id?: UniqueEntityID,
	) {
		return new PrivateVCardMessage(
			{
				...props,
				type: 'vcard',
				quoted: props.quoted ?? null,
				status: props.status ?? 'pending',
				isForwarded: props.isForwarded ?? false,
				isFromDevice: props.isFromDevice ?? true,
				sentBy: props.sentBy ?? null,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)
	}
}
