import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { PrivateMessage, type PrivateMessageProps } from './private-message'
import type { VCardContact } from './value-objects/v-card-contact'

export interface PrivateMultiVCardMessageProps extends PrivateMessageProps {
	type: 'multi_vcard'
	contacts: VCardContact[]
}

export class PrivateMultiVCardMessage extends PrivateMessage<PrivateMultiVCardMessageProps> {
	get type() {
		return this.props.type
	}

	get contacts() {
		return this.props.contacts
	}

	static create(
		props: SetOptional<
			PrivateMultiVCardMessageProps,
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
		return new PrivateMultiVCardMessage(
			{
				...props,
				type: 'multi_vcard',
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
