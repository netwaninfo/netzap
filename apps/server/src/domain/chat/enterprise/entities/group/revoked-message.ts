import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import { Attendant } from '../attendant'
import { GroupMessage, type GroupMessageProps } from './message'

export interface GroupRevokedMessageProps extends GroupMessageProps {
	type: 'revoked'
	revokedAt: Date
	revokedBy: Attendant | null
}

export class GroupRevokedMessage extends GroupMessage<GroupRevokedMessageProps> {
	get type() {
		return this.props.type
	}

	get revokedAt() {
		return this.props.revokedAt
	}

	get revokedBy() {
		return this.props.revokedBy
	}

	static create(
		props: Except<
			SetOptional<
				GroupRevokedMessageProps,
				| 'quoted'
				| 'status'
				| 'isForwarded'
				| 'isFromMe'
				| 'sentBy'
				| 'createdAt'
				| 'revokedAt'
				| 'revokedBy'
			>,
			'type'
		>,
		id?: UniqueEntityID,
	) {
		return new GroupRevokedMessage(
			{
				...props,
				type: 'revoked',
				quoted: props.quoted ?? null,
				status: props.status ?? 'pending',
				isForwarded: props.isForwarded ?? false,
				isFromMe: props.isFromMe ?? true,
				sentBy: props.sentBy ?? null,
				createdAt: props.createdAt ?? new Date(),
				revokedAt: props.revokedAt ?? new Date(),
				revokedBy: props.revokedBy ?? null,
			},
			id,
		)
	}
}
