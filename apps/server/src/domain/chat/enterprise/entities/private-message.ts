import { Entity } from '@/core/entities/entity'
import type { MessageProps } from './message'

import type { SetNonNullable } from 'type-fest'
import type { PrivateMessage as QuotedMessage } from '../types/message'

export interface PrivateMessageProps extends MessageProps {
	quoted: QuotedMessage | null
}

type PrivateMessageWithQuoted = SetNonNullable<MessageProps, 'quoted'>

export abstract class PrivateMessage<
	Props extends MessageProps,
> extends Entity<Props> {
	get quoted() {
		return this.props.quoted
	}

	hasQuoted(): this is PrivateMessageWithQuoted {
		return !!this.quoted
	}
}
