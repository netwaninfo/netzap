import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import type { Contact } from '../contact'
import { PrivateMessage, type PrivateMessageProps } from './message'

export interface PrivateMultiVCardMessageProps extends PrivateMessageProps {
	type: 'multi_vcard'
	contacts: Contact[]
}

export class PrivateMultiVCardMessage extends PrivateMessage<PrivateMultiVCardMessageProps> {
	get type() {
		return this.props.type
	}

	get contacts() {
		return this.props.contacts
	}

	static create(
		props: Except<
			SetOptional<
				PrivateMultiVCardMessageProps,
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
		return new PrivateMultiVCardMessage(
			{
				...props,
				type: 'multi_vcard',
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
