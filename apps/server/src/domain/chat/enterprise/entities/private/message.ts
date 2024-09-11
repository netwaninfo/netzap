import { Message, type MessageProps } from '../message'

import type { Except, SetNonNullable } from 'type-fest'
import type { PrivateMessage as QuotedMessage } from '../../types/message'

export interface PrivateMessageProps extends MessageProps {
  quoted: Except<QuotedMessage, 'quoted'> | null
}

type PrivateMessageWithQuoted = SetNonNullable<PrivateMessageProps, 'quoted'>

export abstract class PrivateMessage<
  Props extends PrivateMessageProps,
> extends Message<Props> {
  get quoted() {
    return this.props.quoted
  }

  hasQuoted(): this is PrivateMessageWithQuoted {
    return !!this.quoted
  }
}
