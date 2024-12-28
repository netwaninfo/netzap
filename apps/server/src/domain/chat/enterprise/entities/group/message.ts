import type { Except, SetNonNullable } from 'type-fest'
import type { GroupMessage as QuotedMessage } from '../../types/message.js'
import type { Contact } from '../contact.js'
import { Message, type MessageProps } from '../message.js'

export interface GroupMessageProps extends MessageProps {
  chatType: 'group'
  author: Contact
  quoted: Except<QuotedMessage, 'quoted'> | null
}

type GroupMessageWithQuoted = SetNonNullable<GroupMessageProps, 'quoted'>

export abstract class GroupMessage<
  Props extends GroupMessageProps,
> extends Message<Props> {
  get chatType() {
    return this.props.chatType
  }

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
