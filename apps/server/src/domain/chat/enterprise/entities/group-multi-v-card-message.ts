import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './group-message'
import type { VCardContact } from './value-objects/v-card-contact'

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
		props: SetOptional<
			GroupMultiVCardMessageProps,
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
		return new GroupMultiVCardMessage(
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
