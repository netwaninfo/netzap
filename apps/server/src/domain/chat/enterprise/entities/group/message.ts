import type { Except, SetNonNullable } from 'type-fest'
import type { GroupMessage as QuotedMessage } from '../../types/message'
import type { Contact } from '../contact'
import { Message, type MessageProps } from '../message'

export interface GroupMessageProps extends MessageProps {
	author: Contact
	quoted: Except<QuotedMessage, 'quoted'> | null
}

type GroupMessageWithQuoted = SetNonNullable<GroupMessageProps, 'quoted'>

export abstract class GroupMessage<
	Props extends GroupMessageProps,
> extends Message<Props> {
	get author() {
		return this.props.author
	}

	get quoted() {
		return this.props.quoted
	}

	hasQuoted(): this is GroupMessageWithQuoted {
		return !!this.quoted
	}
}
