import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './group-message'

export interface GroupRevokedMessageProps extends GroupMessageProps {
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

	static create(
		props: SetOptional<
			GroupRevokedMessageProps,
			| 'type'
			| 'quoted'
			| 'status'
			| 'isForwarded'
			| 'isFromDevice'
			| 'sentBy'
			| 'createdAt'
			| 'revokedAt'
			| 'revokedBy'
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
				isFromDevice: props.isFromDevice ?? true,
				sentBy: props.sentBy ?? null,
				createdAt: props.createdAt ?? new Date(),
				revokedAt: props.revokedAt ?? new Date(),
				revokedBy: props.revokedBy ?? null,
			},
			id,
		)
	}
}
