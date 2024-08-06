import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import type { VCardContact } from '../value-objects/v-card-contact'
import { PrivateMessage, type PrivateMessageProps } from './message'

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
		props: Except<
			SetOptional<
				PrivateVCardMessageProps,
				| 'quoted'
				| 'status'
				| 'isForwarded'
				| 'isFromMe'
				| 'sentBy'
				| 'createdAt'
			>,
			'type'
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
				isFromMe: props.isFromMe ?? true,
				sentBy: props.sentBy ?? null,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)
	}
}
