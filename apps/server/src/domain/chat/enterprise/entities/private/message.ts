import { Message, type MessageProps } from '../message.js'

import type { Except, SetNonNullable } from 'type-fest'
import type { PrivateMessage as QuotedMessage } from '../../types/message.js'

export interface PrivateMessageProps extends MessageProps {
  quoted: Except<QuotedMessage, 'quoted'> | null
  chatType: 'private'
}

type PrivateMessageWithQuoted = SetNonNullable<PrivateMessageProps, 'quoted'>

export abstract class PrivateMessage<
  Props extends PrivateMessageProps,
> extends Message<Props> {
  get chatType() {
    return this.props.chatType
  }

  get quoted() {
    return this.props.quoted
  }

  hasQuoted(): this is PrivateMessageWithQuoted {
    return !!this.quoted
  }
}
