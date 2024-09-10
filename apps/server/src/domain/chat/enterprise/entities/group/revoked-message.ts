import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetNonNullable, SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './message'

export interface GroupRevokedMessageProps extends GroupMessageProps {
	quoted: null
	type: 'revoked'
	revokedAt: Date
	revokedBy: UniqueEntityID | null
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

	hasRevokedBy(): this is SetNonNullable<
		GroupRevokedMessageProps,
		'revokedBy'
	> {
		return !!this.revokedBy
	}

	static create(
		props: Except<
			SetOptional<
				GroupRevokedMessageProps,
				| 'status'
				| 'isForwarded'
				| 'isFromMe'
				| 'sentBy'
				| 'createdAt'
				| 'revokedAt'
				| 'revokedBy'
			>,
			'type' | 'quoted'
		>,
		id?: UniqueEntityID,
	) {
		return new GroupRevokedMessage(
			{
				...props,
				type: 'revoked',
				quoted: null,
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
