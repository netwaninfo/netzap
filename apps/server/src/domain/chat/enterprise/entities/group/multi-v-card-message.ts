import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import type { VCardContact } from '../value-objects/v-card-contact'
import { GroupMessage, type GroupMessageProps } from './message'

export interface GroupMultiVCardMessageProps extends GroupMessageProps {
	type: 'multi_vcard'
	contacts: VCardContact[]
}

export class GroupMultiVCardMessage extends GroupMessage<GroupMultiVCardMessageProps> {
	get type() {
		return this.props.type
	}

	get contacts() {
		return this.props.contacts
	}

	static create(
		props: Except<
			SetOptional<
				GroupMultiVCardMessageProps,
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
		return new GroupMultiVCardMessage(
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
