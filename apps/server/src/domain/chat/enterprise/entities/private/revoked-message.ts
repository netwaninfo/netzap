import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import { PrivateMessage, type PrivateMessageProps } from './message'

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
		props: Except<
			SetOptional<
				PrivateRevokedMessageProps,
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
		return new PrivateRevokedMessage(
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
