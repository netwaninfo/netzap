import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { Message, type MessageProps } from './message'

export interface RevokedMessageProps extends MessageProps {
	type: 'revoked'
	revokedAt: Date
	revokedBy: UniqueEntityID | null
}

export class RevokedMessage extends Message<RevokedMessageProps> {
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
			RevokedMessageProps,
			| 'type'
			| 'quotedId'
			| 'status'
			| 'isGif'
			| 'isForwarded'
			| 'isFromDevice'
			| 'sentBy'
			| 'createdAt'
			| 'revokedAt'
			| 'revokedBy'
		>,
		id?: UniqueEntityID,
	) {
		return new RevokedMessage(
			{
				...props,
				type: 'revoked',
				quotedId: props.quotedId ?? null,
				status: props.status ?? 'pending',
				isGif: props.isGif ?? false,
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
