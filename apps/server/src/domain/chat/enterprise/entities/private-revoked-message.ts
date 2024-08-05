import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { PrivateMessage, type PrivateMessageProps } from './private-message'

export interface PrivateRevokedMessageProps extends PrivateMessageProps {
	type: 'revoked'
	revokedAt: Date
	revokedBy: UniqueEntityID | null
}

export class PrivateRevokedMessage extends PrivateMessage<PrivateRevokedMessageProps> {
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
			PrivateRevokedMessageProps,
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
		return new PrivateRevokedMessage(
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
