import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import type { VCardContact } from '../value-objects/v-card-contact'
import { GroupMessage, type GroupMessageProps } from './message'

export interface GroupVCardMessageProps extends GroupMessageProps {
	type: 'vcard'
	contact: VCardContact
}

export class GroupVCardMessage extends GroupMessage<GroupVCardMessageProps> {
	get type() {
		return this.props.type
	}

	get contact() {
		return this.props.contact
	}

	static create(
		props: Except<
			SetOptional<
				GroupVCardMessageProps,
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
		return new GroupVCardMessage(
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